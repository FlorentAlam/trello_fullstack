type TCheckLength = (data:string, minLength: number) => boolean;

export const checkLength:TCheckLength = (data, minlength = 1) => {
    if(!data || typeof data !== 'string') throw new TypeError('Aucune chaine de caractère spécifiée.');
    return data.length >= minlength;
}

type TCheckPasswordEquality = (dataOne: string, dataTwo: string) => boolean;

export const checkPasswordEquality:TCheckPasswordEquality = (dataOne, dataTwo) => {
    if(!dataOne || !dataTwo || typeof dataOne !== 'string' || typeof dataTwo !== 'string') throw new TypeError('2 strings are required.');
    return dataOne === dataTwo;
}