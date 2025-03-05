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
  description: null;
  noOfApplicants: number;
  startOn: null;
  endOn: null;
  companyId: null;
  branchId: null;
  deptId: null;
  positionId: null;
  openingStatus: boolean;
  createdOn: null;
  createdBy: null;
  updatedOn: null;
  updatedBy: null;
  deletedOn: null;
  deletedBy: null;
  remark: null;
}
