import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
    'CI/CD',
    'DevOps',
    'Testing',
    'Unity',
    'Realidad virtual/aumentada',
    'Liderazgo técnico'
  ];

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
