export interface AllowaneModel {
  allowanceId: number;
  companyId: string;
  branchId: number;
  deptId: number;
  positionId: number;
  allowanceName: string;
  description: string;
  status: boolean;
  createdOn: string | null;
  createdBy: string | null;
  updatedOn: string | null;
  updatedBy: string | null;
  deletedOn: string | null;
  deletedBy: string | null;
  remark: string | null;
}
