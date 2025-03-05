export interface ViJobOpeningModel {
  id: number;
  title: string;
  description: string;
  noOfApplicants: number;
  startOn: string;
  endOn: string;
  companyId: string;
  companyName: string;
  branchId: number;
  branchName: string;
  deptId: number;
  deptName: string;
  positionId: number;
  positionName: string;
  openingStatus: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: null;
  updatedBy: null;
  deletedOn: null;
  deletedBy: null;
  remark: null;
}
export interface JobOpeningModel {
  id: number;
  title: string;
  description: null | string;
  noOfApplicants: number;
  startOn: null | string;
  endOn: null | string;
  companyId: null | string;
  branchId: number;
  deptId: number;
  positionId: number;
  openingStatus: boolean;
  createdOn: null | string;
  createdBy: null | string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null | string;
  deletedBy: null | string;
  remark: null | string;
}
