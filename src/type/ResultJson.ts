export type ResultJson = {
    result: CareerFitItem[]
}

export type CareerFitItem = {
    title:string;
    description:string;
    fit:boolean;
    reasons: string[];
}