export interface PolicyModel {
  
  id: number;
  title: string;
  description: string;
  policyType: number;
  companyId: string;
  createdOn: string | null;
  createdBy: string;
  updatedOn: string | null;
  updatedBy: string | null;
  deletedOn: string | null;
  deletedBy: string | null;
  remark: string | null;
}
