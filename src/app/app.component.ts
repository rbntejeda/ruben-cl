import { DecimalPipe, NgClass, NgFor, UpperCasePipe } from '@angular/common';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

type ServiceState = 'online' | 'degraded' | 'offline';

type Snapshot = {
  timeLabel: string;
  serviceState: ServiceState;
  players: number;
  maxPlayers: number;
  cpuLoad: number;
  memoryUsed: number;
  memoryTotal: number;
  latency: number;
  uptimeLabel: string;
  note: string;
  wsState: string;
};

type MetricCard = {
  title: string;
  value: string;
  detail: string;
  tone: 'good' | 'warn' | 'bad';
};

type ArchitectureStep = {
  title: string;
  detail: string;
  badge: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DecimalPipe,
    NgClass,
    NgFor,
    UpperCasePipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatSlideToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private systemThemeQuery?: MediaQueryList;
  private refreshTimer?: number;
  private snapshotIndex = 0;

  private readonly systemThemeListener = (event: MediaQueryListEvent) => {
    this.isLightTheme = !event.matches;
    this.updateThemeColor();
  };

  @HostBinding('class.light-theme')
  protected isLightTheme = false;

  protected readonly title = 'palworld-dashboard';
  protected readonly subtitle =
    'Dashboard técnico para vigilar carga, memoria y disponibilidad con actualizaciones cada 5 segundos.';
  protected readonly wsEndpoint = 'ws://server:8080/ws';
  protected readonly apiEndpoint = 'http://server:8080/api/snapshot';
  protected readonly cadenceLabel = 'Actualiza cada 5 segundos';

  protected snapshot: Snapshot = this.buildSnapshot(0);
  protected history: Snapshot[] = [this.snapshot];

  protected readonly architecture: ArchitectureStep[] = [
    {
      badge: '1',
      title: 'Collector',
      detail:
        'Un worker consulta el estado del host, del contenedor y del juego; luego normaliza CPU, memoria, jugadores y latencia.'
    },
    {
      badge: '2',
      title: 'Pub/Sub',
      detail:
        'Los eventos viajan por Redis Pub/Sub o por un bus equivalente para desacoplar la recolección del frontend.'
    },
    {
      badge: '3',
      title: 'WebSocket',
      detail:
        'El backend empuja cada snapshot por websocket para que la UI reaccione sin refrescar la página.'
    },
    {
      badge: '4',
      title: 'Nginx Proxy Manager',
      detail:
        'El proxy publica el panel, termina TLS y deja pasar las conexiones websocket sin romper el streaming.'
    }
  ];

  protected readonly deploymentNotes = [
    'Dockeriza el panel y el backend en redes internas separadas.',
    'Expone solo el proxy y conserva Redis y el worker en red privada.',
    'Usa variables de entorno para apuntar al host del servidor y al puerto de consulta.'
  ];

  ngOnInit(): void {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    this.systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isLightTheme = !this.systemThemeQuery.matches;
    this.updateThemeColor();
    this.systemThemeQuery.addEventListener('change', this.systemThemeListener);

    this.refreshTimer = window.setInterval(() => this.advanceSnapshot(), 5000);
  }

  ngOnDestroy(): void {
    this.systemThemeQuery?.removeEventListener('change', this.systemThemeListener);

    if (this.refreshTimer !== undefined) {
      window.clearInterval(this.refreshTimer);
    }
  }

  protected toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    this.updateThemeColor();
  }

  protected get serviceBadge(): string {
    switch (this.snapshot.serviceState) {
      case 'online':
        return 'Servicio estable';
      case 'degraded':
        return 'Servicio con carga';
      default:
        return 'Servicio caído';
    }
  }

  protected get metricCards(): MetricCard[] {
    const cpu = this.snapshot.cpuLoad;
    const memoryRatio = this.snapshot.memoryUsed / this.snapshot.memoryTotal;
    const availability = this.snapshot.serviceState === 'online' ? '99.92%' : this.snapshot.serviceState === 'degraded' ? '97.40%' : '0.00%';

    return [
      {
        title: 'CPU',
        value: `${cpu.toFixed(0)}%`,
        detail: cpu < 50 ? 'Holgado' : cpu < 80 ? 'A la mitad' : 'Muy alto',
        tone: cpu < 50 ? 'good' : cpu < 80 ? 'warn' : 'bad'
      },
      {
        title: 'Memoria',
        value: `${this.snapshot.memoryUsed.toFixed(1)} / ${this.snapshot.memoryTotal.toFixed(1)} GB`,
        detail: `${Math.round(memoryRatio * 100)}% en uso`,
        tone: memoryRatio < 0.65 ? 'good' : memoryRatio < 0.85 ? 'warn' : 'bad'
      },
      {
        title: 'Jugadores',
        value: `${this.snapshot.players}/${this.snapshot.maxPlayers}`,
        detail: this.snapshot.players < 10 ? 'Tranquilo' : this.snapshot.players < 20 ? 'Movimiento medio' : 'Servidor lleno',
        tone: this.snapshot.players < 10 ? 'good' : this.snapshot.players < 20 ? 'warn' : 'bad'
      },
      {
        title: 'Disponibilidad',
        value: availability,
        detail: this.serviceBadge,
        tone: this.snapshot.serviceState === 'offline' ? 'bad' : this.snapshot.serviceState === 'degraded' ? 'warn' : 'good'
      }
    ];
  }

  protected get loadBarWidth(): string {
    return `${Math.min(this.snapshot.cpuLoad, 100)}%`;
  }

  protected get memoryBarWidth(): string {
    return `${Math.min((this.snapshot.memoryUsed / this.snapshot.memoryTotal) * 100, 100)}%`;
  }

  protected get historySeries(): Array<{ label: string; load: number; memory: number }> {
    return this.history.map((entry) => ({
      label: entry.timeLabel,
      load: entry.cpuLoad,
      memory: (entry.memoryUsed / entry.memoryTotal) * 100
    }));
  }

  private advanceSnapshot(): void {
    this.snapshotIndex = (this.snapshotIndex + 1) % 5;
    this.snapshot = this.buildSnapshot(this.snapshotIndex);
    this.history = [...this.history.slice(-5), this.snapshot];
  }

  private buildSnapshot(index: number): Snapshot {
    const scenarios: Array<Omit<Snapshot, 'timeLabel'>> = [
      {
        serviceState: 'online',
        players: 7,
        maxPlayers: 32,
        cpuLoad: 28,
        memoryUsed: 4.2,
        memoryTotal: 8,
        latency: 24,
        uptimeLabel: '18h 42m',
        note: 'Exploración estable. El servidor responde rápido y la memoria está sana.',
        wsState: 'WS conectado'
      },
      {
        serviceState: 'online',
        players: 13,
        maxPlayers: 32,
        cpuLoad: 46,
        memoryUsed: 5.1,
        memoryTotal: 8,
        latency: 31,
        uptimeLabel: '18h 47m',
        note: 'Sube la carga: más jugadores, más chunks y más tráfico de red.',
        wsState: 'WS conectado'
      },
      {
        serviceState: 'degraded',
        players: 19,
        maxPlayers: 32,
        cpuLoad: 72,
        memoryUsed: 6.8,
        memoryTotal: 8,
        latency: 58,
        uptimeLabel: '18h 52m',
        note: 'Pico de actividad. Conviene vigilar memoria y latencia antes de escalar.',
        wsState: 'WS conectado'
      },
      {
        serviceState: 'online',
        players: 11,
        maxPlayers: 32,
        cpuLoad: 39,
        memoryUsed: 5.7,
        memoryTotal: 8,
        latency: 29,
        uptimeLabel: '18h 57m',
        note: 'Normalización tras el pico. El servidor vuelve a respirar mejor.',
        wsState: 'WS conectado'
      },
      {
        serviceState: 'offline',
        players: 0,
        maxPlayers: 32,
        cpuLoad: 4,
        memoryUsed: 3.9,
        memoryTotal: 8,
        latency: 0,
        uptimeLabel: 'Reiniciando',
        note: 'Ventana de mantenimiento o reinicio controlado del servicio.',
        wsState: 'WS reconectando'
      }
    ];

    const scenario = scenarios[index];

    return {
      ...scenario,
      timeLabel: this.formatTime(new Date())
    };
  }

  private formatTime(date: Date): string {
    return new Intl.DateTimeFormat('es-CL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  }

  private updateThemeColor(): void {
    if (typeof document === 'undefined') {
      return;
    }

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', this.isLightTheme ? '#f3f6ef' : '#07111a');
  }
}
