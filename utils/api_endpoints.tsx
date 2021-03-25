const BASE_URL = "http://localhost:3300/api";

export const CREATE_TABLEAU_URL = `${ BASE_URL }/tableaux/new`;
export const GET_TABLEAUX_URL = `${ BASE_URL }/tableaux`;
export const UPDATE_TABLEAU_URL = (tableau_id: string) => `${ BASE_URL }/tableaux/update/${ tableau_id }`;
export const DELETE_TABLEAU_URL = (tableau_id: string) => `${ BASE_URL }/tableaux/delete/${ tableau_id }`;

export const CREATE_LISTE_URL = `${ BASE_URL }/listes/new`;
export const GET_LISTES_URL = (tableau_id: string) => `${ BASE_URL }/listes/${ tableau_id }`;
export const UPDATE_LISTE_URL = `${ BASE_URL }/listes/update`;
export const DELETE_LISTE_URL = (liste_id: string) => `${ BASE_URL }/listes/delete/${ liste_id }`;

export const CREATE_CARTE_URL = `${ BASE_URL }/cartes/new`;
export const GET_CARTES_URL = (liste_id: string | number) => `${ BASE_URL }/cartes/${ liste_id }`;
export const UPDATE_CARTE_URL = (carte_id: string | number) => `${ BASE_URL }/cartes/update/${ carte_id }`;
export const DELETE_CARTE_URL = (carte_id: string | number) => `${ BASE_URL }/cartes/delete/${ carte_id }`;

export const USER_INSCRIPTION = `${ BASE_URL }/users/inscription`;
export const USER_CONNEXION = `${ BASE_URL }/users/connexion`;

export const CREATE_ETIQUETTE = `${ BASE_URL }/etiquettes/new`;
export const UPDATE_ETIQUETTE = (etiquette_id: string | number) => `${ BASE_URL }/etiquettes/update/${ etiquette_id }`;
export const DELETE_ETIQUETTE = (etiquette_id: string | number) => `${ BASE_URL }/etiquettes/delete/${ etiquette_id }`;

export const CREATE_CHECKLIST = `${ BASE_URL }/checklists/new`;
export const UPDATE_CHECKLIST = (checklist_id: string | number) => `${ BASE_URL }/checklists/update/${ checklist_id }`;
export const DELETE_CHECKLIST = (checklist_id: string | number) => `${ BASE_URL }/checklists/delete/${ checklist_id }`;