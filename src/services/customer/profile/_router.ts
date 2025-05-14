import { Router } from "express";
import {
  bankDetailsUpdate,
  cdslAndNsdlDetailsUpdate,
  documentDetailsUpdate,
  foreignAddressDetailsUpdate,
  gardianDetailsUpdate,
  indianAddressDetailsUpdate,
  kycDetailsUpdate,
  nomineeDetailsUpdate,
  personalDetailsUpdate,
  UpdateBankDetails,
  UpdateCdslAndNsdlDetails,
  UpdateDocumentDetails,
  UpdateForeignAddressDetails,
  UpdateGardianDetails,
  UpdateIndianAddressDetails,
  UpdateKycDetails,
  UpdateNomineeDetails,
  UpdatePersonalDetails,
  UpdateUserId,
  userIdUpdate,
  view,
  viewBankDetails,
  viewCdslAndNsdlDetails,
  viewDocumentDetails,
  viewForeignAddressDetails,
  viewGardianDetails,
  ViewIndianAddressDetails,
  viewKycDetails,
  viewNomineeDetails,
  viewPersonalDetails,
  viewUserId,
} from "./profile";
const router = Router();

router.post("/personal_details/update", personalDetailsUpdate);
router.post("/document_details/update", documentDetailsUpdate);
router.post("/gardian_details/update", gardianDetailsUpdate);
router.post("/bank_details/update", bankDetailsUpdate);
router.post("/nominee_details/update", nomineeDetailsUpdate);
router.post("/kyc_details/update", kycDetailsUpdate);
router.post("/indian_address_details/update", indianAddressDetailsUpdate);
router.post("/foreign_address_details/update", foreignAddressDetailsUpdate);
router.post("/cdsl_nsdl_details/update", cdslAndNsdlDetailsUpdate);
router.post("/userId/update", userIdUpdate);
router.post("/view", view);

// update All The Details
router.post("/update-personal_details", UpdatePersonalDetails);
router.post("/update-document_details", UpdateDocumentDetails);
router.post("/update-bank_details", UpdateBankDetails);
router.post("/update-nominee_details", UpdateNomineeDetails);
router.post("/Update-indian_address_details", UpdateIndianAddressDetails);
router.post("/update-kyc_details", UpdateKycDetails);
router.post("/update-foreign_address_details", UpdateForeignAddressDetails);
router.post("/update-cdsl_nsdl_details", UpdateCdslAndNsdlDetails);
router.post("/update-gardian_details", UpdateGardianDetails);
router.post("/update-userId", UpdateUserId);

// View All customer details
router.post("/view-personal_details", viewPersonalDetails);
router.post("/view-document_details", viewDocumentDetails);
router.post("/view-bank_details", viewBankDetails);
router.post("/view-nominee_details", viewNomineeDetails);
router.post("/view-indian_address_details", ViewIndianAddressDetails);
router.post("/view-kyc_details", viewKycDetails);
router.post("/view-foreign_address_details", viewForeignAddressDetails);
router.post("/view-cdsl_nsdl_details", viewCdslAndNsdlDetails);
router.post("/view-gardian_details", viewGardianDetails);
router.post("/view-userId", viewUserId);

export default router;
