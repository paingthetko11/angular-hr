export interface BranchModel {
  branchId: number;
  companyId: string;
  branchName: string;
  contactPerson: string;
  primaryPhone: string;
  otherPhone: string;
  email: string;
  houseNo: string;
  streetId: number;
  streetName: null;
  townshipId: number;
  stateId: number;
  photo: null;
  isDefault: boolean;
  isAutoDeduction: boolean;
  status: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null;
  deletedBy: null;
  remark: null;
  company: null;
  hrDepartments: any[];
  hrLeaveGroups: any[];
}
