import { Request, Response } from "express";
import _ from "lodash";
import { Customer } from "./_validation";
import { baseApiCall } from "../../../helper/apiServices";

export const registerCustomer = async (req: Request, res: Response) => {
  const customer: any = await Customer.findOne({ _id: req.body.cid })
    .populate("taxStatus", { taxCode: 1, taxName: 1 })
    .populate("occupationCode", { code: 1, details: 1 })
    .populate("holdingNature", { code: 1, details: 1 })
    .populate("phExemptCategory", { category: 1, description: 1 })
    .populate("shExemptCategory", { category: 1, description: 1 })
    .populate("thExemptCategory", { category: 1, description: 1 })
    .populate("gardianExemptCategory", { category: 1, description: 1 })
    .populate("a1AccountType", { accountCode: 1, description: 1 })
    .populate("a2AccountType", { accountCode: 1, description: 1 })
    .populate("a3AccountType", { accountCode: 1, description: 1 })
    .populate("divPayMode", { code: 1, description: 1 })
    .populate("state", { code: 1, state: 1 })
    .populate("country", { code: 1, name: 1 })
    .populate("communicationMode", { code: 1, details: 1 });

  const url =
    "https://bsestarmfdemo.bseindia.com/StarMFCommonAPI/ClientMaster/Registration";

  const finalData = {
    UserId: "6085101",
    MemberCode: "60851",
    Password: "Demo@123",
    RegnType: "NEW",
    Param: `${customer.clientCode}|${customer.primaryHolderFirstname}|${
      customer.primaryHolderMiddlename
    }|${customer.primaryHolderLastname}|${customer.taxStatus?.taxName}|${
      customer.gender
    }|${
      customer.primaryHolderDob !== null
        ? new Date(customer.primaryHolderDob).toLocaleDateString("en-GB")
        : ""
    }|${customer.occupationCode?.details}|${customer.holdingNature?.code}|${
      customer.secondHolderFirstname
    }|${customer.secondHolderMiddlename}|${customer.secondHolderLastname}|${
      customer.thirdHoldersFirstname
    }|${customer.thirdHoldersMiddlename}|${customer.thirdHoldersLastname}|${
      customer.secondHolderDob !== null
        ? new Date(customer.secondHolderDob).toLocaleDateString("en-GB")
        : ""
    }|${
      customer.thirdHoldersDob !== null
        ? new Date(customer.thirdHoldersDob).toLocaleDateString("en-GB")
        : ""
    }|${customer.gardianFirstName}|${customer.gardianMiddleName}|${
      customer.gardianLastName
    }|${
      customer.gardianDob !== null
        ? new Date(customer.gardianDob).toLocaleDateString("en-GB")
        : ""
    }|${customer.phPanExempt}|${customer.shPanExempt}|${customer.thPanExempt}|${
      customer.gardianPanExempt
    }|${customer.phPan}|${customer.shPan}|${customer.thPan}|${
      customer.gardianPan
    }|${
      customer.phExemptCategory != null ||
      customer.phExemptCategory != undefined
        ? customer.phExemptCategory?.category
        : ""
    }|${
      customer.shExemptCategory != null ||
      customer.shExemptCategory != undefined
        ? customer.shExemptCategory?.category
        : ""
    }|${
      customer.thExemptCategory != null ||
      customer.thExemptCategory != undefined
        ? customer.thExemptCategory?.category
        : ""
    }|${
      customer.gardianExemptCategory != null ||
      customer.gardianExemptCategory != undefined
        ? customer.gardianExemptCategory?.category
        : ""
    }|${customer.clientType}|${customer.pms}|${customer.defaultDp}|${
      customer.cdslDpId
    }|${customer.cdslCltId}|${customer.cmBpId != null ? customer.cmBpId : ""}|${
      customer.nsdlDpId
    }|${customer.nsdlCltId}|${
      customer.a1AccountType != null || customer.a1AccountType != undefined
        ? customer.a1AccountType?.accountCode
        : ""
    }|${customer.a1AccountNo}|${customer.a1MicrNo}|${customer.a1IfscCode}|${
      customer.a1DefaultBankFlag
    }|${
      customer.a2AccountType != null || customer.a2AccountType != undefined
        ? customer.a2AccountType?.accountCode
        : ""
    }|${customer.a2AccountNo}|${customer.a2MicrNo}|${customer.a2IfscCode}|${
      customer.a2DefaultBankFlag
    }|${
      customer.a3AccountType != null || customer.a3AccountType != undefined
        ? customer.a3AccountType?.accountCode
        : ""
    }|${customer.a3AccountNo}|${customer.a3MicrNo}|${customer.a3IfscCode}|${
      customer.a3DefaultBankFlag
    }|||||||||||${customer.chequeName}|${customer.divPayMode.code}|${
      customer.address1
    }|${customer.address2}|${customer.address3}|${customer.city}|${
      customer.state?.state
    }|${customer.pincode}|${customer.country?.name}|${
      customer.residentialPhone
    }|${customer.residentialFax}|${customer.officePhone}|${
      customer.officeFax
    }|${customer.email}|${customer.communicationMode?.code}|${
      customer.foreignAddress1
    }|${customer.foreignAddress2}|${customer.foreignCity}|${
      customer.foreignState
    }|${customer.foreignPincode}|${customer.foreignCountry}|${
      customer.foreignResidentialPhone
    }|${customer.foreignResidentialFax}|${customer.foreignOfficePhone}|${
      customer.foreignOfficeFax
    }|${customer.inMobileNumber}|${customer.n1Name}|${
      customer.n1Relationship
    }|${customer.n1Applicable != null ? customer.n1Applicable : ""}|${
      customer.n1MinorFlag
    }|${
      customer.n1Dob != null
        ? new Date(customer.n1Dob).toLocaleDateString("en-GB")
        : ""
    }|${customer.n1Gardian}|${customer.n2Name}|${customer.n2Relationship}|${
      customer.n2Applicable != null ? customer.n2Applicable : ""
    }|${customer.n2MinorFlag}|${
      customer.n2Dob != null
        ? new Date(customer.n2Dob).toLocaleDateString("en-GB")
        : ""
    }|${customer.n2Gardian}|||||||${customer.phKycType}|${
      customer.phCkycNumber
    }|${customer.shKycType}|${customer.shCkycNumber}|${customer.thKycType}|${
      customer.thCkycNumber
    }|${customer.gardianKycType}|${
      customer.gardianCkycNumber != null ? customer.gardianCkycNumber : ""
    }|${customer.phKraExemptRefNo}|${customer.shKraExemptRefNo}|${
      customer.thKraExemptRefNo
    }|${customer.gardianExemptRefNo}|${customer.aadhaarUpdated}|${
      customer.mapinId
    }|${customer.paperlessFlag}|${customer.leiNo || ""}|${
      customer.leiValidity != null ? customer.leiValidity : ""
    }|${customer.mobileDeclarationFlag}|${customer.emailDeclarationFlag}||`,
    Filler1: "",
    Filler2: "",
  };

  const response: any = await baseApiCall("post", url, finalData);

  res.status(200).json({ success: true, data: response });
};
