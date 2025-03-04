export interface ViDeductionModel {
  deductionId: number;
  deductionName: string;
  companyId: string;
  companyName: string;
  branchId: number;
  branchName: string;
  deptId: number;
  deptName: string;
  description: string;
  isDefault: boolean;
  status: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null;
  deletedBy: null;
  remark: null;
}
export interface DeductionModel {
  deductionId: number;
  companyId: string;
  branchId: number;
  deptId: number;
  deductionName: string;
  description: null | string;
  isDefault: boolean;
  status: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null | string;
}
