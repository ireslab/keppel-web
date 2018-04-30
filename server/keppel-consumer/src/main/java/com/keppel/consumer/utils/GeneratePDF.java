package com.keppel.consumer.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import com.itextpdf.text.Anchor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.GrayColor;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;
import com.keppel.consumer.dto.AccountDto;
import com.keppel.consumer.service.impl.KeppelConsumerServiceImpl;

public class GeneratePDF {
	AccountDto mAccountDto;
	FacesContext facesContext;
	OutputStream outputStream;
	static Logger log = Logger.getLogger(KeppelConsumerServiceImpl.class.getName());
	private String FILE = "/u01/FRC/SignUpDocs/Signup.pdf";

	private String foaTC = "/u01/FRC/SignUpDocs/GENERAL_TERMS_AND_CONDITIONS.pdf";

	public void generatePDF(FacesContext facesContext, OutputStream outputStream, AccountDto dto) {
		mAccountDto = dto;
		this.generatePDFFile(facesContext, outputStream); // Generate PDF File

		List<InputStream> list = new ArrayList<InputStream>();
		try {
			// Source pdfs
			list.add(new FileInputStream(new File(FILE)));
			log.info("FOA Details file======" + FILE);
			list.add(new FileInputStream(new File(foaTC)));
			log.info("foaTC Details file======" + foaTC);
			// Resulting pdf
			OutputStream out = new FileOutputStream(new File("/u01/FRC/SignUpDocs/SignUp_FOA.pdf"));

			doMerge(list, out);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		this.downloadPDF(facesContext); // Download PDF File
	}

	/* Merging details and Terms and conditions */
	public static void doMerge(List<InputStream> list, OutputStream outputStream)
			throws DocumentException, IOException {
		Document document = new Document();
		PdfWriter writer = PdfWriter.getInstance(document, outputStream);
		document.open();
		PdfContentByte cb = writer.getDirectContent();

		for (InputStream in : list) {
			PdfReader reader = new PdfReader(in);
			for (int i = 1; i <= reader.getNumberOfPages(); i++) {
				document.newPage();
				// import the page from source pdf
				PdfImportedPage page = writer.getImportedPage(reader, i);
				// add the page to the destination pdf
				cb.addTemplate(page, 1, 2);
			}
		}

		outputStream.flush();
		document.close();
		outputStream.close();
	}

	private void downloadPDF(FacesContext facesContext) {

		FileInputStream fdownload = null;
		try {

			facesContext = FacesContext.getCurrentInstance();

			ServletContext context =

					(ServletContext) facesContext.getExternalContext().getContext();

			ExternalContext ctx = facesContext.getExternalContext();

			HttpServletResponse res = (HttpServletResponse) ctx.getResponse();

			res.setContentType("application/pdf");

			log.info(context.getRealPath("/"));

			File file = new File("/u01/FRC/SignUpDocs/SignUp_FOA.pdf");

			byte[] b;

			fdownload = new FileInputStream(file);

			int n;

			while ((n = fdownload.available()) > 0) {
				b = new byte[n];
				if (b != null) {
					int result = fdownload.read(b);
					outputStream.write(b, 0, b.length);
					if (result == -1)
						break;
				}
			}
			outputStream.flush();
		} catch (Exception e) {
			log.info(e.toString());
		} finally {
			if (fdownload != null) {
				inSafeClose(fdownload);
			}
		}
	}

	public static void inSafeClose(FileInputStream fis) {
		if (fis != null) {
			try {
				fis.close();
			} catch (IOException e) {
				log.info(e.toString());
			}
		}
	}

	public static void outSafeClose(FileOutputStream fos) {
		if (fos != null) {
			try {
				fos.close();
			} catch (IOException e) {
				log.info(e.toString());
			}
		}
	}

	private void generatePDFFile(FacesContext facesContext, OutputStream outputStream) {

		FileInputStream fdownload = null;
		FileOutputStream fdoc = null;
		try {

			log.info("In Generate PDF................");

			Document document = new Document();

			fdoc = new FileOutputStream(FILE);
			PdfWriter writer = PdfWriter.getInstance(document, fdoc);
			// writer.setPageEvent(new PageNumeration());
			log.info("befgore document open................");
			document.open();

			addFOAInfo(document);

			document.close();
			facesContext = facesContext.getCurrentInstance();

			ServletContext context = (ServletContext) facesContext.getExternalContext().getContext();

			log.info(context.getRealPath("/"));
			File file = new File(FILE);

			byte[] b;

			log.info(file.getCanonicalPath());

			System.out.println(file.getAbsolutePath());

			fdownload = new FileInputStream(file);

			int n;

			while ((n = fdownload.available()) > 0) {
				b = new byte[n];
				if (b != null) {
					int result = fdownload.read(b);
					outputStream.write(b, 0, b.length);
					if (result == -1)
						break;
				}
			}

			outputStream.flush();

		} catch (Exception e) {

			log.info(e.toString());

		} finally {
			if (fdownload != null) {
				inSafeClose(fdownload);
			}
			if (fdoc != null) {
				outSafeClose(fdoc);
			}
		}
	}

	// New Code Added by Indira

	private void addFOAInfo(Document document) throws DocumentException {
		try {
			log.info("File creation ===>addFOAInfo ");
			Image lineImage = Image.getInstance("/u01/FRC/SignUpDocs/GIRO/line.JPG");
			Image image = Image.getInstance("/u01/FRC/SignUpDocs/GIRO/keppel_logo.JPG");
			image.setAlignment(Image.ALIGN_LEFT);
			document.add(image);
			PdfPTable formTable = new PdfPTable(1);
			formTable.getDefaultCell().setBorder(PdfPCell.NO_BORDER);
			formTable.addCell(getFormCell("FORM OF ACCEPTANCE", PdfPCell.ALIGN_RIGHT));

			document.add(formTable);
			PdfPTable table = new PdfPTable(5);
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);

			try {
				table.setWidths(new float[] { 5, 30, 1, 49, 5 });
			} catch (DocumentException e) {
				e.printStackTrace();
			}
			table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
			table.setWidthPercentage(100);
			table.setHorizontalAlignment(Element.ALIGN_MIDDLE);
			String premiseAddress = mAccountDto.getPremiseAddress();
			String billingAddress = mAccountDto.getBillingAddress();
			// String bPostalCode = mAccountDto.getBillingPostalcode();
			// String postalCodeVal = mAccountDto.getPostcode();
			String residentalVal = mAccountDto.getTenantOrOwner();
			String getAccountNumber = mAccountDto.getEbsOrMSSLAccountNumber();
			String plansContractDuration = mAccountDto.getContractDuration();
			String selectedRPlan = mAccountDto.getSelectedPlan();

			String servStartDateVal = mAccountDto.getServiceStartDate();
			SimpleDateFormat originalFormat = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat targetFormat = new SimpleDateFormat("dd/MM/yyyy");
			if (servStartDateVal != null) {
				try {
					CommonUtils.changeDateFormat(servStartDateVal, originalFormat, targetFormat);
				}catch(Exception exception) {
					
				}
			}

			String additionalServicesVas1 = mAccountDto.getOptionalService2();
			String additionalServices = mAccountDto.getOptionalService1();
			String paymentMethod = mAccountDto.getPaymentMethod();
			String getIcNumberType = mAccountDto.getIcNumberType();
			String icIdVal = mAccountDto.getIcNumber();
			String fNameVal = mAccountDto.getFirstName();
			String lNameVal = mAccountDto.getLastName();
			String emailVal = mAccountDto.geteMail();
			String contactNoVal = mAccountDto.getContactPhoneNumber();
			// String userId = mAccountDto.getUserId();
			String promoCodeVal = mAccountDto.getPromoCode();
			String promoCodeDiscount = "";
			String securityDeposit = mAccountDto.getSecurityDeposit();
		

			addKeppelHeader(table, "Premises Details", "");
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			if (!"".equals(premiseAddress) && premiseAddress != null) {
				addKeppelEntry(table, "Premises Address:", premiseAddress);
			}

			addKeppelEntry(table, "Billing Address:", billingAddress);
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			addKeppelEntry(table, "Ownership Type:", residentalVal);

			if (getAccountNumber != null) {
				addKeppelEntry(table, "SP Account Number:", getAccountNumber);
			} else {

			}

			// addKeppelEntry(table, "Premise Details Attachment", fileName);
			if (selectedRPlan != null && !"".equals(selectedRPlan)) {
				addKeppelEntry(table, "Electricity Plan selection:", selectedRPlan);
			}

			if (plansContractDuration != null && !"".equals(plansContractDuration)) {
				addKeppelEntry(table, "Contract Period:", plansContractDuration + " " + "months");
			}

			if (servStartDateVal != null && !"".equals(servStartDateVal)) {
				addKeppelEntry(table, "Service Start Date:", servStartDateVal + "(Tentative)");
			}

			log.info("000additionalServices--> " + additionalServices + " additionalServicesVas1--> "
					+ additionalServicesVas1);

			// COde Added by Indira-21-3-2018
			// TODO Put "" check
			//
			// if ((additionalServicesVas1 != null && additionalServicesVas1.equals("Vas1"))
			// && (additionalServices != null && !additionalServices.equals("PaperBill"))) {
			// log.info("additionalServicesVas1 eq VAS1---> " + additionalServicesVas1);
			// addKeppelEntry(table, "Only electronic bills will be sent", "");
			// }
			// if (additionalServicesVas1 == null && additionalServices == null) {
			// log.info("additionalServicesVas1 additionalServices eq null---> " +
			// additionalServicesVas1);
			// addKeppelEntry(table, "Only electronic bills will be sent", "");
			// }
			// if ((additionalServicesVas1 != null && additionalServicesVas1.equals("Vas1"))
			// && (additionalServices != null && additionalServices.equals("PaperBill"))) {
			// log.info("2222additionalServices--> " + additionalServices + "
			// additionalServicesVas1--> "
			// + additionalServicesVas1);
			// addKeppelEntry(table, "Additional Services",
			// "Paper Bill($2/Bill), Smart Meter(One-time $40 if applicable)");
			//
			// } else if (additionalServices != null &&
			// additionalServices.equals("PaperBill")) {
			// log.info("3333additionalServices--> " + additionalServices + "
			// additionalServicesVas1--> "
			// + additionalServicesVas1);
			// addKeppelEntry(table, "Additional Services:", "Paper Bill($2/Bill)");
			// } else if ((additionalServicesVas1 != null &&
			// additionalServicesVas1.equals("Vas1"))) {
			// log.info("1111additionalServices--> " + additionalServices + "
			// additionalServicesVas1--> "
			// + additionalServicesVas1);
			// addKeppelEntry(table, "Additional Services", "Smart Meter(One-time $40 if
			// applicable)");
			//
			// }
			
			try {
				String tier1Amount = mAccountDto.getTier1Amount();
				String tier2Amount = mAccountDto.getTier2Amount();
				String tier3Amount = mAccountDto.getTier3Amount();
				String productMapKeyVal = mAccountDto.getProductMapKeyVal();
				String pdfDotAmount = mAccountDto.getPdfDotAmount();
				String pdfFppAmount = mAccountDto.getPdfFppAmount();
				String pdfTier1Amount = mAccountDto.getTier1Amount();
				String pdfPeakValueT1 = mAccountDto.getPdfPeakValueT1();
				String pdfTier3Amount = mAccountDto.getTier3Amount();
				String pdfPeakValueT3 = mAccountDto.getPdfPeakValueT3();

				addKeppelHeader(table, "Product Charges", "");

				// log.info(" :pdfDotAmount in FOA::" + pdfDotAmount);
				// log.info(" :pdfFppAmount in FOA::" + pdfFppAmount);
				// String tier1Amount = getRPVersion(selectedRPlan, "t1", activePlanMap);
				// String tier2Amount = getRPVersion(selectedRPlan, "t2", activePlanMap);
				// String tier3Amount = getRPVersion(selectedRPlan, "t3", activePlanMap);

				addKeppelEntry(table, " ", "Consumption will be Loss Adjusted");

				if (!"".equals(tier1Amount) && tier1Amount.equals(tier2Amount) && tier1Amount.equals(tier3Amount)) {
					if (pdfDotAmount != null && productMapKeyVal.equals("DOT")) {
						addKeppelEntry(table, "Energy Charges", "" + pdfDotAmount + "  % off SP Tariff");

					} else if (pdfFppAmount != null && productMapKeyVal.equals("FIX")) {
						addKeppelEntry(table, "Energy Charges", "" + pdfFppAmount + "  cents/kWh");
					}
				} else {
					if (!"".equals(pdfTier1Amount) && pdfTier1Amount != null && pdfPeakValueT1 != null
							&& !"".equals(pdfPeakValueT1)) {
						addKeppelEntry(table, "Peak Rate", "" + pdfPeakValueT1 + " " + pdfTier1Amount);
						log.info(" ::tier1Amount and peakValueT1 in pdf::" + pdfTier1Amount + " peakValueT1-->  "
								+ pdfTier1Amount);
					}
					if (!"".equals(pdfTier3Amount) && pdfTier3Amount != null && pdfPeakValueT3 != null
							&& !"".equals(pdfPeakValueT3)) {
						log.info("--> peakValueT3 in pdf" + pdfPeakValueT3);
						addKeppelEntry(table, "Off Peak Rate", "" + pdfPeakValueT3 + " " + pdfTier3Amount);
					}
				}
			}catch(Exception exception) {
				log.info(exception.getMessage());
			}
			
			addKeppelHeader(table, "Additional Services", "");
			if ((additionalServicesVas1 != null && additionalServicesVas1.equals("Smart Meter"))
					&& (additionalServices != null && !additionalServices.equals("Paper Bill"))) {
				log.info("additionalServicesVas1 eq VAS1---> " + additionalServicesVas1);
				addKeppelEntry(table, "Only electronic bills will be sent", "");
			}
			if (additionalServicesVas1 == null && additionalServices == null) {
				log.info("additionalServicesVas1 additionalServices eq null---> " + additionalServicesVas1);
				addKeppelEntry(table, "Only electronic bills will be sent", "");
			}
			if ((additionalServicesVas1 != null && additionalServicesVas1.equals("Smart Meter"))
					&& (additionalServices != null && additionalServices.equals("Paper Bill"))) {
				log.info("2222additionalServices--> " + additionalServices + " additionalServicesVas1--> "
						+ additionalServicesVas1);
				addKeppelEntry(table, "Additional Services",
						"Paper Bill($2/Bill), Smart Meter(One-time $40 if applicable)");

			} else if (additionalServices != null && additionalServices.equals("Paper Bill")) {
				log.info("3333additionalServices--> " + additionalServices + " additionalServicesVas1--> "
						+ additionalServicesVas1);
				addKeppelEntry(table, "Additional Services:", "Paper Bill($2/Bill)");
			} else if ((additionalServicesVas1 != null && additionalServicesVas1.equals("Smart Meter"))) {
				log.info("1111additionalServices--> " + additionalServices + " additionalServicesVas1--> "
						+ additionalServicesVas1);
				addKeppelEntry(table, "Additional Services", "Smart Meter(One-time $40 if applicable)");

			}

			// COde Added by Indira-21-3-2018
			if (paymentMethod.equals("GIRO")) {
				addKeppelEntry(table, "Payment Mode:", "Giro");

			} else if (paymentMethod.equals("IDDA")) {
				addKeppelEntry(table, "Payment Mode:", "Giro (DBS/POSB)");

			} else if (paymentMethod.equals("RECUR")) {
				addKeppelEntry(table, "Payment Mode:", "Recurring (Debit /Credit Card)");

			} else if (paymentMethod.equals("OTH")) {
				addKeppelEntry(table, "Payment Mode:", "Others");

			}

			addKeppelEntry(table, "Credit Terms:", "14 Days from Invoice Date");

			addKeppelEntry(table, "Charging Period:", "Monthly (As per MSSL Billing Period)");

			addKeppelEntry(table, "Early Termination & Other Charges:", "As stated in Terms & Conditions");
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);

			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			// document.add(Chunk.NEWLINE);
			// document.add(Chunk.NEWLINE);

			// addKeppelHeader(table, "Product Charges", "");
			//
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			// addKeppelHeader(table, "Additional Services", "");
			// if (additionalServices != null && additionalServices.equals("PaperBill"))
			// addKeppelEntry(table, "Paper Bill", "($2/Bill)");
			// if (additionalServicesVas1 != null && additionalServicesVas1.equals("Vas1"))
			// addKeppelEntry(table, "Smart Meter", "(One-time $40 if applicable)");
			// addKeppelEntry(table, "", "");
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			// if (!userId.equals("CHAN") && promoCodeVal != null) {
			// addKeppelHeader(table, "Promotion", "");
			// addKeppelEntry(table, "Promo - " + promoCodeVal + ":", "(-$ " +
			// promoCodeDiscount + "on 1st Bill)");
			//
			// }

			if (promoCodeVal != null && promoCodeVal.length() > 0 && promoCodeDiscount != null
					&& promoCodeDiscount.length() > 0) {
				addKeppelHeader(table, "Promotion", "");
				addKeppelEntry(table, "Promo - " + promoCodeVal + ":", "(-$ " + promoCodeDiscount + "on 1st Bill)");
			}

			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);

			addKeppelHeader(table, "Miscellaneous", "");
			if (securityDeposit != null && securityDeposit.length() > 0) {
				addKeppelEntry(table, "Security Deposit:", "S$ " + securityDeposit);
			}
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);

			lineImage.scaleAbsolute(500, 4);

			document.add(lineImage);
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			addKeppelHeader(table, "Personal Details", "");
			if (getIcNumberType != null) {

				if (getIcNumberType.equals("BIC")) {
					addKeppelEntry(table, "ID Type:", "BLUE IC");

				} else if (getIcNumberType.equals("FIN")) {
					addKeppelEntry(table, "ID Type:", "FIN");

				} else if (getIcNumberType.equals("PIC")) {
					addKeppelEntry(table, "ID Type:", "PINK IC");

				}

			}

			addKeppelEntry(table, "ID Number:", icIdVal);

			String consName = "(" + "''" + "Consumer" + "''" + ") Name";
			addKeppelEntry(table, consName, fNameVal + " " + lNameVal);
			addKeppelEntry(table, "Email Address:", emailVal);

			addKeppelEntry(table, "Contact:", contactNoVal);

			log.info("FOA::: ID Number::: " + icIdVal + " Email Address:: " + emailVal + " Contact No:: " + contactNoVal
					+ " ID Type:: " + getIcNumberType);
			try {
				document.add(table);
			} catch (DocumentException e) {
				e.printStackTrace();
			}
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			// addKeppelEntry(table, "", "");
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			Anchor anchorKeppel = new Anchor("www.keppelelectric.com");
			anchorKeppel.setReference("www.keppelelectric.com");
			addKeppelEntry(table, "", "");
			addKeppelEntry(table, "", "");
			Paragraph p1 = new Paragraph(
					"Unless otherwise defined, capitalised terms used in this Form of Acceptance shall have the meanings ascribed to them in the Residential Consumers General Terms and Conditions (a copy of which is available at http://www.keppelelectric.com) (''GT&Cs''). For each Premises specified above, a separate and distinct agreement shall be formed for the services to be provided at such Premises, on the terms of the GT&amp;Cs and the terms applicable to that Premises in this Form of Acceptance. The effectiveness of each such agreement is subject to the conditions precedent set out in Clause 2.1 of the GT&Cs having been satisfied or waived in accordance with the provisions of the GT&Cs.",
					FontFactory.getFont(FontFactory.HELVETICA, 9));

			document.add(p1);
			Paragraph p2 = new Paragraph(
					"Discount-off regulated tariff plan(s) will be discounted off prevailing residential electricity tariff.",
					FontFactory.getFont(FontFactory.HELVETICA, 9));
			document.add(p2);

			// Paragraph p4 = new Paragraph("formed for the services to be provided at such
			// Premises, on the terms of the GT&Cs and the terms applicable to that
			// Premises",FontFactory.getFont(FontFactory.HELVETICA, 9));
			//
			// document.add(p4);

			// document.add(new Paragraph("Unless otherwise defined, capitalised terms used
			// in this Form of Acceptance shall have the meanings",
			// FontFactory.getFont(FontFactory.HELVETICA, 9)));
			// document.add(new Paragraph("ascribed to them in the Residential Consumers
			// General Terms and Conditions (a copy of which is available at",
			// FontFactory.getFont(FontFactory.HELVETICA, 9)));
			// document.add(new Paragraph("in this Form of Acceptance. The effectiveness of
			// each such agreement is subject to the conditions precedent set out in Clause
			// 2.1 of the GT&Cs having been satisfied or waived in accordance with the
			// provisions of the GT&Cs.",
			// FontFactory.getFont(FontFactory.HELVETICA, 9)));
			// document.add(new Paragraph("in this Form of Acceptance. The effectiveness of
			// each such agreement is subject to the conditions precedent set out in Clause
			// 2.1 of the GT&Cs having been satisfied or waived in accordance with the
			// provisions of the GT&Cs.",
			// FontFactory.getFont(FontFactory.HELVETICA, 9)));

			// document.add(new Phrase("\n"));
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			document.add(Chunk.NEWLINE);
			PdfPTable addTable = new PdfPTable(1);
			addTable.getDefaultCell().setBorder(PdfPCell.NO_BORDER);
			addTable.setWidthPercentage(100);
			addTable.addCell(getBoldCell("Keppel Electric Pte Ltd", PdfPCell.ALIGN_LEFT));
			addTable.addCell(
					getCell("1 Harbour Front Avenue #05-05 Keppel Bay Tower Singapore 098632", PdfPCell.ALIGN_LEFT));
			addTable.addCell(getCell("Tel: +65 6803 3000", PdfPCell.ALIGN_LEFT));
			addTable.addCell(getCell("Email: enquiry@keppelelectric.com", PdfPCell.ALIGN_LEFT));

			document.add(addTable);

			document.newPage();

		} catch (Exception ioe) {
			log.info(ioe.toString());
		}
	}

	public PdfPCell getCell(String text, int alignment) {
		Font f = new Font(com.itextpdf.text.Font.FontFamily.HELVETICA, 9, Font.NORMAL, GrayColor.BLACK);
		PdfPCell cell = new PdfPCell(new Phrase(text, f));
		cell.setPadding(4);
		cell.setPaddingRight(16);
		cell.setHorizontalAlignment(alignment);
		cell.setBorder(PdfPCell.NO_BORDER);
		return cell;
	}

	/**
	 * This method adds the header for the section
	 * 
	 * @param table
	 * @param headerName
	 * @param value
	 */
	public static void addKeppelHeader(PdfPTable table, String headerName, String value) {
		PdfPCell cellbefore = new PdfPCell(new Phrase(""));
		cellbefore.setBorder(Rectangle.NO_BORDER);
		table.addCell(cellbefore);

		Font myfont1 = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
		PdfPCell mycell1 = new PdfPCell(new Phrase(headerName, myfont1));
		mycell1.setBorder(Rectangle.NO_BORDER);
		mycell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table.addCell(mycell1);

		PdfPCell cell1 = new PdfPCell(new Phrase(""));
		cell1.setBorder(Rectangle.NO_BORDER);
		table.addCell(cell1);

		Font myfont2 = new Font(Font.FontFamily.HELVETICA, 11);
		PdfPCell mycell2 = new PdfPCell(new Phrase(value, myfont2));
		mycell2.setBorder(Rectangle.NO_BORDER);
		mycell2.setHorizontalAlignment(Element.ALIGN_LEFT);
		table.addCell(mycell2);

		PdfPCell cellAfter = new PdfPCell(new Phrase(""));
		cellAfter.setBorder(Rectangle.NO_BORDER);
		table.addCell(cellAfter);
	}

	public static void addKeppelEntry(PdfPTable table, String columnName, String value) {

		PdfPCell cellbefore = new PdfPCell(new Phrase(""));
		cellbefore.setBorder(Rectangle.NO_BORDER);
		table.addCell(cellbefore);

		Font myfont1 = new Font(Font.FontFamily.HELVETICA, 11);
		PdfPCell mycell1 = new PdfPCell(new Phrase(!"".equals(columnName) ? (columnName + " ") : columnName, myfont1));
		mycell1.setBorder(Rectangle.NO_BORDER);
		mycell1.setHorizontalAlignment(Element.ALIGN_RIGHT);
		table.addCell(mycell1);

		PdfPCell cell1 = new PdfPCell(new Phrase(""));
		// cell1.setColspan(5);
		cell1.setBorder(Rectangle.NO_BORDER);
		// cell1.setPaddingBottom(10);
		table.addCell(cell1);

		Font myfont2 = new Font(Font.FontFamily.HELVETICA, 11);
		PdfPCell mycell2 = new PdfPCell(new Phrase(value, myfont2));
		mycell2.setBorder(Rectangle.NO_BORDER);
		mycell2.setHorizontalAlignment(Element.ALIGN_LEFT);
		table.addCell(mycell2);

		PdfPCell cellAfter = new PdfPCell(new Phrase(""));
		cellAfter.setBorder(Rectangle.NO_BORDER);
		table.addCell(cellAfter);
	}

	public PdfPCell getBoldCell(String text, int alignment) {
		Font f = new Font(com.itextpdf.text.Font.FontFamily.HELVETICA, 9, Font.BOLD, GrayColor.BLACK);
		PdfPCell cell = new PdfPCell(new Phrase(text, f));
		cell.setPadding(4);
		cell.setPaddingRight(16);
		cell.setHorizontalAlignment(alignment);
		cell.setBorder(PdfPCell.NO_BORDER);
		return cell;
	}

	public PdfPCell getFormCell(String text, int alignment) {
		Font f = new Font(com.itextpdf.text.Font.FontFamily.HELVETICA, 14, Font.BOLD, GrayColor.BLACK);
		PdfPCell cell = new PdfPCell(new Phrase(text, f));
		cell.setPadding(0);
		cell.setPaddingRight(0);
		cell.setHorizontalAlignment(alignment);
		cell.setBorder(PdfPCell.NO_BORDER);

		return cell;
	}

	// Ended by Indira

	public String getFILE() {
		return FILE;
	}

	public void setFILE(String fILE) {
		FILE = fILE;
	}

}
