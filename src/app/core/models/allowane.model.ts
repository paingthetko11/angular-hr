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

// export interface ViAllowanceModel {
//   allowanceId: number;
//   allowanceName: string;
//   companyId: string;
//   companyName: string;
//   branchId: number;
//   branchName: string;
//   deptId: number;
//   deptName: string;
//   positionId: number;
//   positionName: string;
//   description: string;
//   status: boolean;
//   createdOn: string;
//   createdBy: string;
//   updatedOn: null;
//   updatedBy: null;
//   deletedOn: null;
//   deletedBy: null;
//   remark: null;
// }
