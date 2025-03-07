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
  description: string | null;
  noOfApplicants: number;
  startOn: string | null;
  endOn: string | null;
  companyId: string | null;
  branchId: number;
  deptId: number;
  positionId: number;
  openingStatus: boolean;
  createdOn: string | null;
  createdBy: string | null;
  updatedOn: string | null;
  updatedBy: string | null;
  deletedOn: string | null;
  deletedBy: string | null;
  remark: string | null;
}
