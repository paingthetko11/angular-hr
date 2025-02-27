export interface PositionModel {
  positionId: number;
  deptId: number;
  positionName: string;
  status: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null;
  deletedBy: null;
  remark: null;
  dept: null;
}
