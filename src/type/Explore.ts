export type Explore = {
    prompter:string,
    searchTerms:string[];
    careers: ExploreCareer[]
}

export type ExploreCareer = {
    title:string,
    description:string,
    requirements:string[]
}