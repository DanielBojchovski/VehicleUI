export class IdRequest {
    private id: number = 0;

    getId() {
        return this.id;
    }
    constructor(_id: number) {
        this.id = _id;
    }
}