import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

type Experience = {
  period: string;
  role: string;
  company: string;
  highlights: string[];
  stack: string[];
};

type Project = {
  title: string;
  context: string;
  challenge: string;
  decisions: string[];
  outcome: string;
  stack: string[];
};

type Study = {
  year: string;
  title: string;
  institution: string;
};

type TechCategory = {
  title: string;
  items: string[];
};

type FeatureFlagPractice = {
  title: string;
  description: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatSlideToggleModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    '[class.light-theme]': 'isLightTheme()'
  }
})
export class AppComponent implements OnInit, OnDestroy {
  private systemThemeQuery?: MediaQueryList;
  private readonly systemThemeListener = (event: MediaQueryListEvent) => {
    this.isLightTheme.set(!event.matches);
    this.updateThemeColor();
  };

  protected readonly isLightTheme = signal(false);
  protected readonly isMenuOpen = signal(false);
  protected readonly currentYear = new Date().getFullYear();

  ngOnInit(): void {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    this.systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isLightTheme.set(!this.systemThemeQuery.matches);
    this.updateThemeColor();
    this.systemThemeQuery.addEventListener('change', this.systemThemeListener);
  }

  ngOnDestroy(): void {
    this.systemThemeQuery?.removeEventListener('change', this.systemThemeListener);
  }

  protected readonly contact = {
    email: 'contacto@ruben.cl',
    phone: '+56 9 9122 3304',
    phoneHref: 'tel:+56991223304',
    location: 'Región del Biobío, Chile',
    linkedin: 'https://www.linkedin.com/in/rub%C3%A9n-eduardo-tejeda-roa-3771459a',
    github: 'https://github.com/rbntejeda'
  };

  protected readonly skills = [
    'Arquitectura de software',
    'Angular',
    'Module Federation',
    'Monorepo',
    'AWS',
    'Amazon Cognito',
    'Azure',
    'Terraform',
    'GitHub Actions',
    'CI/CD',
    'Feature flags',
    'Testing',
    'Liderazgo técnico'
  ];

  protected readonly techCategories: TechCategory[] = [
    {
      title: 'Arquitectura y patrones',
      items: ['Monorepo', 'Micro-frontends', 'Microservicios', 'DDD', 'SOLID', 'Repository', 'Strategy', 'Command Handler']
    },
    {
      title: 'Identidad y autenticación',
      items: ['Amazon Cognito', 'OAuth2', 'OpenID Connect', 'Federación con Google', 'MFA', 'Passwordless', 'Migración de usuarios', 'ClaveÚnica', 'JWT']
    },
    {
      title: 'Frontend',
      items: ['Angular', 'Module Federation', 'React', 'Vue.js', 'Blazor', 'Angular Material', 'Sass']
    },
    {
      title: 'Backend e integración',
      items: ['.NET', 'Entity Framework', 'Node.js', 'Express', 'Spring Boot', 'REST', 'SignalR', 'Socket.io', 'Swagger / OpenAPI']
    },
    {
      title: 'Cloud y DevOps',
      items: ['AWS', 'Lambda', 'API Gateway', 'S3', 'CloudFront', 'IAM', 'Azure', 'Azure DevOps', 'Terraform', 'GitHub Actions', 'Bitbucket Pipelines', 'Docker', 'Kubernetes']
    },
    {
      title: 'Bases de datos',
      items: ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle', 'MongoDB', 'Redis', 'Firebase']
    },
    {
      title: 'Lenguajes',
      items: ['TypeScript', 'JavaScript', 'C#', 'Java', 'Python', 'PHP', 'Bash']
    },
    {
      title: 'Feature flags y experimentación',
      items: ['LaunchDarkly', 'Progressive delivery', 'Kill switches', 'A/B testing']
    },
    {
      title: 'IA y automatización',
      items: ['Ollama', 'OpenClaw', 'Slack Bot', 'YOLO']
    },
    {
      title: 'Métodos de trabajo',
      items: ['Scrum', 'Kanban', 'XP']
    }
  ];

  protected readonly projects: Project[] = [
    {
      title: 'Arquitectura de autenticación con Amazon Cognito',
      context: 'Identidad y seguridad',
      challenge:
        'Unificar el acceso de aplicaciones con distintos tipos de usuarios y llevar las cuentas existentes a un proveedor de identidad central.',
      decisions: [
        'Amazon Cognito como proveedor de identidad central.',
        'Estrategia de migración de usuarios definida según el tipo de aplicación.',
        'Inicio de sesión federado con Google.',
        'Autenticación multifactor (MFA) y acceso passwordless.'
      ],
      outcome: 'Un inicio de sesión centralizado, con opciones de acceso más seguras y con menos fricción para los usuarios.',
      stack: ['Amazon Cognito', 'OAuth2', 'OpenID Connect', 'Google', 'MFA', 'Passwordless']
    },
    {
      title: 'Infraestructura AWS multiaccount como código',
      context: 'Universidad de Chile — Matemáticas en Ruta',
      challenge: 'Separar ambientes, permisos y recursos del proyecto para operarlo de forma segura y sostenible.',
      decisions: [
        'Arquitectura AWS multiaccount con una cuenta por ambiente.',
        'Toda la infraestructura definida con Terraform.',
        'Automatización y documentación técnica para la operación.'
      ],
      outcome: 'Una base cloud reproducible y documentada que asegura la continuidad del proyecto.',
      stack: ['AWS', 'Terraform', 'IAM']
    },
    {
      title: 'Integración con ClaveÚnica y Ventanilla Única',
      context: 'AGCID',
      challenge: 'Conectar los servicios de la agencia con la autenticación ciudadana y la interoperabilidad del Estado.',
      decisions: [
        'Integración con ClaveÚnica y Ventanilla Única mediante estándares de autenticación e interoperabilidad.',
        'Módulos de ticketing, gestión documental y certificación medioambiental.'
      ],
      outcome: 'Servicios con trazabilidad para la operación interna y la atención de solicitudes.',
      stack: ['ClaveÚnica', 'OpenID Connect']
    }
  ];

  protected readonly featureFlagPractices: FeatureFlagPractice[] = [
    {
      title: 'Progressive delivery',
      description: 'Liberación gradual por ambiente, segmento o porcentaje de usuarios para reducir riesgo en producción.'
    },
    {
      title: 'Kill switches',
      description: 'Desactivación rápida de funcionalidades sin redeploy cuando una integración o flujo crítico presenta problemas.'
    },
    {
      title: 'Experimentación controlada',
      description: 'Validación de cambios con métricas, audiencias específicas y aprendizaje antes de escalar una funcionalidad.'
    }
  ];

  protected toggleTheme(): void {
    this.isLightTheme.update((isLight) => !isLight);
    this.updateThemeColor();
  }

  private updateThemeColor(): void {
    if (typeof document === 'undefined') {
      return;
    }

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', this.isLightTheme() ? '#f8fafc' : '#101827');
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected readonly experiences: Experience[] = [
    {
      period: '2025',
      role: 'Desarrollador FullStack',
      company: 'Dily',
      highlights: [
        'Diseñé la infraestructura AWS como código con Terraform.',
        'Implementé despliegue continuo con Bitbucket Pipelines y definí los procesos DevOps del equipo.',
        'Asesoré técnicamente los proyectos y construí pruebas unitarias y de integración.'
      ],
      stack: ['AWS', 'Terraform', 'Bitbucket Pipelines', 'Testing']
    },
    {
      period: '2025',
      role: 'Especialista Cloud / DevOps',
      company: 'Universidad de Chile — Proyecto Matemáticas en Ruta',
      highlights: [
        'Diseñé una arquitectura AWS multiaccount con Terraform, separando ambientes, permisos y recursos por cuenta.',
        'Automaticé y documenté la infraestructura para asegurar la operación y continuidad del proyecto.'
      ],
      stack: ['AWS', 'Terraform', 'IAM']
    },
    {
      period: '2025',
      role: 'Desarrollador FullStack e Integraciones',
      company: 'AGCID',
      highlights: [
        'Integré ClaveÚnica y Ventanilla Única usando estándares de autenticación e interoperabilidad.',
        'Desarrollé módulos de ticketing, gestión documental y certificación medioambiental.',
        'Construí funcionalidades de trazabilidad para la operación interna y la atención de solicitudes.'
      ],
      stack: ['ClaveÚnica', 'OpenID Connect']
    },
    {
      period: '2023 — 2024',
      role: 'Desarrollador FullStack',
      company: 'Innod SPA',
      highlights: [
        'Desarrollé el frontend con despliegue en S3 y CloudFront.',
        'Realicé el levantamiento técnico y construí funcionalidades cloud en Azure y AWS.',
        'Diseñé procesos DevOps y asesoré técnicamente el desarrollo del producto.'
      ],
      stack: ['S3', 'CloudFront', 'AWS', 'Azure']
    },
    {
      period: '2021',
      role: 'Desarrollador Backend',
      company: 'Innod SPA',
      highlights: [
        'Analicé, diseñé y desarrollé sistemas de supervisión de alta concurrencia.',
        'Configuré los procesos y entornos de desarrollo para el trabajo colaborativo del equipo.'
      ],
      stack: []
    },
    {
      period: '2018 — 2021',
      role: 'Jefe de Sistemas de Información',
      company: 'Qualitatcorp Ltda.',
      highlights: [
        'Mejoré los procesos de producción, la integración entre sistemas y la fiabilidad de los procesos TI.',
        'Alineé el desarrollo y la operación con las necesidades del negocio.'
      ],
      stack: []
    },
    {
      period: '2017',
      role: 'Encargado de Sistemas',
      company: 'Qualitatcorp Ltda.',
      highlights: [
        'Desarrollé e implementé un sistema con interfaces en Unity para aplicaciones de realidad virtual.',
        'Mejoré la comunicación con clientes y el valor de los productos tecnológicos.'
      ],
      stack: ['Unity', 'Realidad virtual']
    },
    {
      period: '2016',
      role: 'Desarrollador Unity',
      company: 'Proyecto Simuladores de Gases — Virginio Gómez / Qualitatcorp',
      highlights: ['Integré interfaces, Arduino, Android y realidad aumentada en simuladores de gases.'],
      stack: ['Unity', 'Arduino', 'Android', 'Realidad aumentada']
    },
    {
      period: '2015',
      role: 'Asesor Informático',
      company: 'Corporación Chilena de la Madera A.G.',
      highlights: [
        'Asesoré técnicamente los proyectos académicos CEAT e IInal.',
        'Gestioné los sistemas de competencias laborales de CORMA.'
      ],
      stack: []
    },
    {
      period: '2014',
      role: 'Scrum Master',
      company: 'Proyecto Borde Costero — SP Consultores Ltda.',
      highlights: ['Optimicé recursos y reduje riesgos externos y blandos mediante tecnologías web.'],
      stack: ['Scrum']
    }
  ];

  protected readonly studies: Study[] = [
    {
      year: '2014',
      title: 'Ingeniería de Ejecución en Computación e Informática',
      institution: 'Universidad del Bío-Bío'
    },
    {
      year: '2014',
      title: 'Diplomado en Emprendimiento y Liderazgo',
      institution: 'Universidad del Bío-Bío'
    },
    {
      year: '2018',
      title: 'Creación de aplicaciones con React y Express',
      institution: 'Instituto Profesional Virginio Gómez'
    },
    {
      year: '2013',
      title: 'Curso Integral de Liderazgo y Equipos de Trabajo',
      institution: 'Universidad del Bío-Bío'
    },
    {
      year: '2013',
      title: 'XII Jornadas Chilenas de Computación',
      institution: 'Valparaíso'
    }
  ];

  protected readonly hobbies = [
    'Tecnología aplicada a productos reales',
    'Cloud, automatización y mejora continua',
    'Realidad virtual, realidad aumentada y experiencias interactivas',
    'Aprendizaje, liderazgo y construcción de equipos'
  ];
}
