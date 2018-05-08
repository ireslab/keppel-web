package com.keppel.consumer.utils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.xml.bind.DatatypeConverter;

import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

public class FTPUtils {

	FTPClient ftp = null;

	public FTPUtils(String host, String user, String pwd) throws Exception {
		ftp = new FTPClient();
		ftp.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
		int reply;
		ftp.connect(host);
		reply = ftp.getReplyCode();
		if (!FTPReply.isPositiveCompletion(reply)) {
			ftp.disconnect();
			throw new Exception("Exception in connecting to FTP Server");
		}
		ftp.login(user, pwd);
		ftp.setFileType(FTP.BINARY_FILE_TYPE);
		ftp.enterLocalPassiveMode();
	}

	public void uploadFile(String fileName, String hostDir, String filedata) throws Exception {
		byte[] imageByte = DatatypeConverter.parseBase64Binary(filedata);
		ByteArrayInputStream base = new ByteArrayInputStream(imageByte);
		try {
			this.ftp.storeFile(hostDir + fileName, base);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
	}

	public void disconnect() {
		if (this.ftp.isConnected()) {
			try {
				this.ftp.logout();
				this.ftp.disconnect();

			} catch (IOException f) {
				f.printStackTrace();
			}
		}
	}

}
