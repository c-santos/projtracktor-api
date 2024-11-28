export type DatabaseModelStruct<DatabaseModel> = new (
    ...args: any[]
) => DatabaseModel;
