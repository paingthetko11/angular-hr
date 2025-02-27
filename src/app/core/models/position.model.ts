export interface PositionModel {
  positionId: number;
  positionName: string;
  deptId: number;
  deptName: string;
  branchId: number;
  branchName: string;
  companyId: string;
  companyName: string;
  status: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null;
  deletedBy: null;
  remark: null;
}
