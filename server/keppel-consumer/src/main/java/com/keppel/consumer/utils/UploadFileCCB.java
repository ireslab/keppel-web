//package com.keppel.consumer.utils;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.InputStream;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.keppel.consumer.controller.KeppelConsumerController;
//import com.keppel.consumer.dto.AccountDto;
//
//public class UploadFileCCB {
//	final Logger log = LoggerFactory.getLogger(KeppelConsumerController.class);
//	public void uploadFiles(AccountDto data) {
//		if (data.getAttachmentData() != null && data.getAttachmentData().length() > 10) {
//			String path = createFolder(data.getIcNumber());
//			log.info("path returning from createFolder is: " + path);
//			UploadedFile file ;//= (UploadedFile) valueChangeEvent.getNewValue();
//			String contentType = file.getContentType();
//			log.info("contentType--> " + contentType);
//			if (contentType.equals("application/pdf") || contentType.equals("image/jpeg")
//					|| contentType.equals("image/png")) {
//				// path = "/u01/appdata/NewConnection/exportFiles/" + file.getFilename();
//				String fileName = data.getIcNumber() + "_" + file.getFilename();
//				path = path + fileName;
//				// String fileName = path.replace(".", "_" + seq + ".");
//				log.info("path-->" + path);
//				log.info("fileName--> " + file.getFilename());
//				InputStream inputStream = null;
//				try {
//					FileOutputStream out = new FileOutputStream(path);
//					inputStream = file.getInputStream();
//					byte[] buffer = new byte[8192];
//					int bytesRead = 0;
//					while ((bytesRead = inputStream.read(buffer, 0, 8192)) != -1) {
//						out.write(buffer, 0, bytesRead);
//					}
//					out.flush();
//					out.close();
//				} catch (Exception ex) {
//					ex.printStackTrace();
//				} finally {
//					try {
//						inputStream.close();
//					} catch (Exception e) {
//						e.printStackTrace();
//					}
//				}
//
//			} else {
//				log.info("Please upload PDF or JPG files only.");
// 				return;
//			}
//		}
//	}
//
//	private String createFolder(String myfolder) {
//		String dir = "/u01/FRC/SignUpDocs/" + myfolder + "/";
//		try {
//			log.info("inside CreateFolder try dir is : " + dir);
//			boolean result = false;
//			File directory = new File(dir);
//
//			if (!directory.exists()) {
//				log.info("inside CreateFolder !directory.exists()");
//				result = directory.mkdir();
//				if (result) {
//					log.info("inside CreateFolder !if (result)");
//					return dir;
//				} else {
//					log.info("inside CreateFolder else");
//					return "failed";
//				}
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		log.info("inside CreateFolder line 1347");
//		return dir;
//	}
//}
