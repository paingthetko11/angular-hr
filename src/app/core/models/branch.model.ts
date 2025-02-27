export interface BranchModel {
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
  streetName: string;
  townshipId: number;
  townshipName: string;
  stateId: number;
  stateName: string;
  photo: null;
  status: boolean;
  createdOn: string;
  createdBy: string;
  updatedOn: null | string;
  updatedBy: null | string;
  deletedOn: null;
  deletedBy: null;
  remark: null;
}
