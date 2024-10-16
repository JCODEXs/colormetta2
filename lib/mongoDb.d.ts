declare module "mongoDb" {
  export function connectToDatabase(): Promise<any>;
  export function insertDocument(collection: string, document: any): Promise<any>;
}
