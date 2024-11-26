export interface _Itask {
    name: string;
    pattern: string;
    datas: _IData[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface _IData {
    _id:string,
    create_date: Date;
    due_date: Date;
    status: boolean;
    completed_date: Date | null;
    foreign_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface _IApiResponse<TData> {
    statusCode: number;
    data: TData;
    message: string;
    success: boolean;
  }
  