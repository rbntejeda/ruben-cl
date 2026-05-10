import { Component, HostBinding } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

type Experience = {
  period: string;
  role: string;
  company: string;
  highlights: string[];
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatSlideToggleModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @HostBinding('class.light-theme')
  protected isLightTheme = false;

  protected isMenuOpen = false;

  protected readonly contact = {
    email: 'rubentejedaroa@gmail.com',
    phone: '+56 9 9122 3304',
    location: 'Región del Biobío, Chile'
  };

  protected readonly skills = [
    'Angular',
    'FullStack',
    'Backend',
    'AWS',
    'Azure',
    'Terraform',
    'GitHub Actions',
    'OpenClaw',
    'Ollama',
    'Slack Bot',
    'Cognito',
    'CI/CD',
    'DevOps',
    'Testing',
    'Unity',
    'Realidad virtual/aumentada',
    'Liderazgo técnico'
  ];

  protected readonly techCategories: TechCategory[] = [
    {
      title: 'Métodos de trabajo',
      items: ['Kanban', 'XP', 'SCRUM', 'Cascada', 'Espiral']
    },
    {
      title: 'Arquitectura y patrones',
      items: ['SOLID', 'DDD', 'Strategy', 'Builder', 'Factory', 'Singleton', 'Repository', 'Decorator', 'Observer', 'Adapter', 'Command Handler']
    },
    {
      title: 'Modelado',
      items: ['OO', 'Estructurado', 'DFD', 'MER/ER', 'Casos de uso', 'Lucidchart', 'PowerDesigner', 'MySQL Workbench']
    },
    {
      title: 'Frontend',
      items: ['Angular 6+', 'ReactJS', 'Vue.js', 'Blazor/Razor Pages', 'Electron', 'Laravel MVC', 'Yii2', 'Unity', 'Bootstrap', 'Material Design', 'Sass']
    },
    {
      title: 'Backend e integración',
      items: ['.NET Core 3+', 'Entity Framework', 'Kestrel', 'Node.js', 'Express', 'Spring Boot', 'REST', 'SOAP', 'OAuth2', 'OpenID Connect', 'Cognito', 'Google Federation', 'JWT', 'SignalR', 'Socket.io', 'MQTT', 'Node-RED', 'Swagger', 'Microservicios', 'Minimal APIs', 'Slack Bot']
    },
    {
      title: 'Bases de datos',
      items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Oracle SQL', 'Microsoft SQL Server', 'IndexedDB']
    },
    {
      title: 'Lenguajes',
      items: ['PHP 5-8', 'JavaScript', 'TypeScript', 'ECMAScript 6', 'C', 'C++', 'C#', 'Java', 'HTML5', 'CSS', 'Sass', 'Python', 'Bash']
    },
    {
      title: 'Cloud y DevOps',
      items: ['Azure', 'Azure DevOps', 'Azure Pipelines', 'GitHub Actions', 'Azure VM', 'Azure App Service', 'AWS', 'EC2', 'S3', 'Route 53', 'IAM', 'Cognito', 'CloudFront', 'API Gateway', 'Lambda', 'Terraform', 'Docker', 'Kubernetes', 'Container Registry', 'AWS CLI', 'Azure CLI']
    },
    {
      title: 'Servidores y servicios',
      items: ['Debian', 'CentOS', 'Ubuntu Server', 'Apache2', 'SSL', 'HTTP/2', 'PHP-FPM', 'Samba', 'SSH', 'Nextcloud', 'GitLab', 'Gogs', 'Redis', 'Memcached', 'APCu', 'NFS', 'DLNA', 'RDP']
    },
    {
      title: 'CMS, IA y ofimática',
      items: ['WordPress', 'WooCommerce', 'Moodle', 'Wix', 'OpenClaw', 'Ollama', 'YOLO v5-v8', 'Excel avanzado', 'Microsoft Project medio', 'Prezi avanzado']
    }
  ];

  protected toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
  }

  protected toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  protected closeMenu(): void {
    this.isMenuOpen = false;
  }

  protected readonly experiences: Experience[] = [
    {
      period: '2025',
      role: 'Desarrollador FullStack',
      company: 'Dily',
      highlights: [
        'Levantamiento técnico de infraestructura AWS con Terraform.',
        'Despliegue continuo con Bitbucket Pipelines y diseño de procesos DevOps.',
        'Asesoría de proyectos, desarrollo y construcción de pruebas unitarias e integración.'
      ]
    },
    {
      period: '2025',
      role: 'Especialista Cloud / DevOps',
      company: 'Universidad de Chile — Proyecto Matemáticas en Ruta',
      highlights: [
        'Levantamiento de infraestructura AWS multiaccount con Terraform.',
        'Diseño de base cloud para separar ambientes, permisos y recursos por cuenta.',
        'Automatización y documentación técnica para operación y continuidad del proyecto.'
      ]
    },
    {
      period: '2025',
      role: 'Desarrollador FullStack e Integraciones',
      company: 'AGCID',
      highlights: [
        'Integración con ClaveÚnica y Ventanilla Única mediante estándares de autenticación e interoperabilidad.',
        'Desarrollo de módulos de ticketing, gestión documental y certificación medioambiental.',
        'Construcción de funcionalidades orientadas a trazabilidad, operación interna y atención de solicitudes.'
      ]
    },
    {
      period: '2023 — 2024',
      role: 'Desarrollador FullStack',
      company: 'Innod SPA',
      highlights: [
        'Desarrollo frontend con despliegues en S3 y CloudFront.',
        'Levantamiento técnico y funcionalidades cloud en Azure y AWS.',
        'Diseño de procesos DevOps, asesoría técnica y desarrollo de producto.'
      ]
    },
    {
      period: '2021',
      role: 'Desarrollador Backend',
      company: 'Innod SPA',
      highlights: [
        'Análisis, diseño y desarrollo de proyectos de supervisión de alta concurrencia.',
        'Configuración de procesos y entornos de desarrollo para trabajo colaborativo.'
      ]
    },
    {
      period: '2018 — 2021',
      role: 'Jefe de Sistemas de Información',
      company: 'Qualitatcorp Ltda.',
      highlights: [
        'Mejora de procesos de producción, integración de interfaces y fiabilidad de procesos TI.',
        'Alineamiento entre desarrollo, operación y necesidades de negocio.'
      ]
    },
    {
      period: '2017',
      role: 'Encargado de Sistemas',
      company: 'Qualitatcorp Ltda.',
      highlights: [
        'Desarrollo e implementación de sistema con interfaces en Unity para aplicaciones de realidad virtual.',
        'Mejora de la comunicación con clientes y valor de productos tecnológicos.'
      ]
    },
    {
      period: '2016',
      role: 'Desarrollador Unity',
      company: 'Proyecto Simuladores de Gases — Virginio Gómez / Qualitatcorp',
      highlights: [
        'Integración de interfaces, Arduino, Android y realidad aumentada.'
      ]
    },
    {
      period: '2015',
      role: 'Asesor Informático',
      company: 'Corporación Chilena de la Madera A.G.',
      highlights: [
        'Asesoría técnica en proyectos académicos CEAT e IInal.',
        'Gestión de sistemas de competencias laborales CORMA.'
      ]
    },
    {
      period: '2014',
      role: 'Scrum Master',
      company: 'Proyecto Borde Costero — SP Consultores Ltda.',
      highlights: [
        'Optimización de recursos y reducción de riesgos externos y blandos mediante tecnologías web.'
      ]
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
