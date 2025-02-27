export interface Company {
  companyId: string;
  companyName: string;
  joinDate: string;
  licenseNo: string;
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
  status: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null;
  deletedBy: null;
  remark: null;
  hrBranches: any[];
  hrLeaveGroups: any[];
  hrLoanTypes: any[];
}
