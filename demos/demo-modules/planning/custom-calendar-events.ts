import { CalendarEvent } from 'angular-calendar';
import { colors } from '../demo-utils/colors';
import { EventColor } from 'calendar-utils';

export interface BulletinService extends CalendarEvent {
    responsable?: string,
    missions?: Mission[]
}

export interface Mission extends CalendarEvent {
    indicatifRadio?: string,
    chefUnite?: string,
    categorie: string,
    lieu?: string,
    debut?: Date,
    fin?: Date,
    effectif?: number,
    equipementRequis?: string,
    priorite: number,
    description?: string,
    equipes?: Equipe[],
    affectee: boolean
}

export interface Equipe {
    nom: string,
    agents?: Agent[],
    missions?: Mission[],
    color: EventColor
}

export interface Agent {
    nom: string
}