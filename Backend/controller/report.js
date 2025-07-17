import { Report } from "../models/Report";
import { deleteChat } from "./chat";

export const createReport = async (req, res) => {
  let { error } = await reportValidation.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.details[0].message });
  }
  let report = new Report(req.body);

  await report
    .save()
    .then(() => {
      res.status(200).json({ message: "Reported Successfully" });
    })
    .catch(() => {
      res.status(404).json({ message: "Error!!" });
    });
};

export const actionReport = async (req, res) => {
  let reportId = req.body.reportId;
  try {
    let report = await Report.findOne({ _id: reportId });
    let chatId = report.chatId;
    let devUsername = req.username;

    await deleteChat(chatId, "developer");

    await Report.updateMany(
      { chatId: chatId },
      { $set: { status: "action_taken", reviewedBy: devUsername } }
    );


  } catch (err) {
    res.status(400).json({ message: "report doesnot exists" });
  }
};

export const dismissReport = async (req, res) => {
  let reportId = req.body.reportId;
  let devUsername = req.username;
  try {
    await Report.updateOne(
      { _id: reportId },
      { $set: { status: "dismissed", reviewedBy : devUsername } }
    );
  } catch (err) {
    res.status(400).json({ message: "report doesnot exists" });
  }
};

export const getPendingReports = async(req,res)=>{
    try {
        let reports = await Report.find({ status : "pending" });
        return res.status(200).json({message : "Result found", reports});
    } catch (err) {
        return res.status(404).json({message : "No reports found"});
    }
}

export const getDismissedReports = async(req,res)=>{
    try {
        let reports = await Report.find({ status : "dismissed" });
        return res.status(200).json({message : "Result found", reports});
    } catch (err) {
        return res.status(404).json({message : "No reports found"});
    }
}

export const getActionTakenReports = async(req,res)=>{
    try {
        let reports = await Report.find({ status : "action_taken" });
        return res.status(200).json({message : "Result found", reports});
    } catch (err) {
        return res.status(404).json({message : "No reports found"});
    }
}