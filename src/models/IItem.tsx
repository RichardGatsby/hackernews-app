//The model is the same for storys & comments so lets call it a item
export default interface IItem {
    id: number,
    title: string,
    text: string,
    by: string,
    url: string,
    score: number,
    time: number,
    kids: number[],
    type: string,
    comments: IItem[]
    index: number,
}