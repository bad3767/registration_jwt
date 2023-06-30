const nodemailer = require("nodemailer");

exports.send_email = (email, otp) => {
  console.log("otp: ", otp);
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "surendharcloud168@gmail.com",
      pass: "haymzvyxmcszcuzj",
    },
  });

  let mailDetails = {
    from: "surendharcloud168@gmail.com",
    to: email,
    subject: "Test mail",
    text: "Your OTP : ",
    otp,
    html: `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Client Mirror | OTP Verification</title>
    <style type="text/css">
      /* reset */
      article,aside,details,figcaption,figure,footer,header,hgroup,nav,section,summary{display:block}audio,canvas,video{display:inline-block;*display:inline;*zoom:1}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html,button,input,select,textarea{font-family:sans-serif}body{margin:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}h1{font-size:2em;margin:0 0.67em 0}h2{font-size:1.5em;margin:0 0 .83em 0}h3{font-size:1.17em;margin:1em 0}h4{font-size:1em;margin:1.33em 0}h5{font-size:.83em;margin:1.67em 0}h6{font-size:.75em;margin:2.33em 0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:bold}blockquote{margin:1em 40px}dfn{font-style:italic}mark{background:#ff0;color:#000}p,pre{margin:1em 0}code,kbd,pre,samp{font-family:monospace,serif;_font-family:'courier new',monospace;font-size:1em}pre{white-space:pre;white-space:pre-wrap;word-wrap:break-word}q{quotes:none}q:before,q:after{content:'';content:none}small{font-size:75%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-0.5em}sub{bottom:-0.25em}dl,menu,ol,ul{margin:1em 0}dd{margin:0 0 0 40px}menu,ol,ul{padding:0 0 0 40px}nav ul,nav ol{list-style:none;list-style-image:none}img{border:0;-ms-interpolation-mode:bicubic}svg:not(:root){overflow:hidden}figure{margin:0}form{margin:0}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0;white-space:normal;*margin-left:-7px}button,input,select,textarea{font-size:100%;margin:0;vertical-align:baseline;*vertical-align:middle}button,input{line-height:normal}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;*overflow:visible}button[disabled],input[disabled]{cursor:default}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;*height:13px;*width:13px}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}textarea{overflow:auto;vertical-align:top}table{border-collapse:collapse;border-spacing:0}

      /* custom client-specific styles including styles for different online clients */
      .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* hotmail / outlook.com */
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%;} /* hotmail / outlook.com */
      table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Outlook */
      #outlook a{padding:0;} /* Outlook */
      img{-ms-interpolation-mode: bicubic;display:block;outline:none; text-decoration:none;} /* IExplorer */
      body, table, td, p, a, li, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; font-weight:normal!important;}
      .ExternalClass td[class="ecxflexibleContainerBox"] h3 {padding-top: 10px !important;} /* hotmail */

      /* email template styles */
      h1{display:block;font-size:26px;font-style:normal;font-weight:normal;line-height:150%;}
      h2{display:block;font-size:20px;font-style:normal;font-weight:normal;line-height:150%;}
      h3{display:block;font-size:18px;font-style:normal;font-weight:normal;line-height:160%;}
      h4{display:block;font-size:17px;font-style:normal;font-weight:normal;line-height:150%;margin: 0;}
      h5{display:block;font-size:14px;font-style:normal;font-weight:normal;line-height:100%;margin: 0;}
      .flexibleImage{height:auto;}
      table[class=flexibleContainerCellDivider] {padding-bottom:0 !important;padding-top:0 !important;}

      body, #bodyTbl{background-color:#E1E1E1;}
      #emailHeader{background-color:#E1E1E1;}
      #emailBody{background-color:#FFFFFF;}
      #emailFooter{background-color:#E1E1E1;}
      .textContent {color:#8B8B8B; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:18px; line-height:125%; text-align:Left;}
      .textContent a{color:#205478; text-decoration:underline;}
      .emailButton{background-color:#205478; border-collapse:separate;}
      .buttonContent{color:#FFFFFF; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:18px; font-weight:bold; line-height:100%; padding:15px; text-align:center;}
      .buttonContent a{padding: 0 20px;color:#FFFFFF; display:block; text-decoration:none!important; border:0!important;line-height: 150%; font-size: 16px;}
      #invisibleIntroduction {display:none;display:none !important;} /* hide the introduction text */

      /* other framework hacks and overrides */
      span[class=ios-color-hack] a {color:#275100!important;text-decoration:none!important;} /* Remove all link colors in IOS (below are duplicates based on the color preference) */
      span[class=ios-color-hack2] a {color:#205478!important;text-decoration:none!important;}
      span[class=ios-color-hack3] a {color:#8B8B8B!important;text-decoration:none!important;}
      /* phones and sms */
      .a[href^="tel"], a[href^="sms"] {text-decoration:none!important;color:#606060!important;pointer-events:none!important;cursor:default!important;}
      .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {text-decoration:none!important;color:#606060!important;pointer-events:auto!important;cursor:default!important;}

      /* responsive styles */
      @media only screen and (max-width: 480px){
        body{width:100% !important; min-width:100% !important;}
        table[id="emailHeader"], table[id="emailBody"], table[id="emailFooter"], table[class="flexibleContainer"] {width:100% !important;}
        td[class="flexibleContainerBox"], td[class="flexibleContainerBox"] table {display: block;width: 100%;text-align: left;}
        td[class="imageContent"] img {height:auto !important; width:100% !important; max-width:100% !important;}
        img[class="flexibleImage"]{height:auto !important; width:100% !important;max-width:100% !important;}
        img[class="flexibleImageSmall"]{height:auto !important; width:auto !important;}
        table[class="flexibleContainerBoxNext"]{padding-top: 10px !important;}
        table[class="emailButton"]{width:100% !important;}
        td[class="buttonContent"]{padding:0 !important;}
        td[class="buttonContent"] a{padding:15px !important;}
  
        h1{display:block;font-size:18px;font-style:normal;font-weight:normal;line-height:100%;}
        h2{display:block;font-size:15px;font-style:normal;font-weight:normal;line-height:150%;}
        h3{display:block;font-size:14px;font-style:normal;font-weight:normal;line-height:150%;}
        h4{display:block;font-size:13px;font-style:normal;font-weight:normal;line-height:150%; margin: 0;}
        h5{display:block;font-size:12px;font-style:normal;font-weight:normal;line-height:150%;}
        .buttonContent a {font-size: 14px;font-weight: 140%;}
      }
    </style>
  </head>

  <body bgcolor="#F2F2F2" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
    <center>
      <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTbl" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
        <tr>
          <td align="center" valign="top" id="bodyCell">

            <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="560" id="emailHeader">
              <tr>
                <td height="30px" align="center" valign="top">

                </td>
              </tr>
            </table>

			<table bgcolor="#fff" border="0" cellpadding="0" cellspacing="0" width="560" id="emailHeader">
				<tr>
					<td align="center" valign="top">
					  <table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
						  <td align="center" valign="top">
							<table border="0" bgcolor="#fff" cellpadding="0" cellspacing="0" width="560" class="flexibleContainer">
							  <tr>
								<td align="center" valign="top" width="560" class="flexibleContainerCell">
	
								  <table border="0" cellpadding="0" cellspacing="0" width="100%">
									<tr>
									  <td align="center" valign="top" class="imageContent" style="padding: 20px 0;">
										<img src="https://cloud-hrms-tool.s3.amazonaws.com/mma-backend/client_mirror.png" width="100" class="flexibleImage" style="max-width:100px;width:100%;display:block;box-shadow: 1px 1px 15px #dcdcdc;border-radius: 100%;" alt="ClientMirror" title="ClientMirror" />
									  </td>
									</tr>
								  </table>
	
								</td>
							  </tr>
							</table>
						  </td>
						</tr>
					  </table>
					</td>
				  </tr>
			  </table>

			  <table bgcolor="#fff" border="0" cellpadding="0" cellspacing="0" width="560" id="emailHeader">
				<tr>
					<td align="center" valign="top">
					  <table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
						  <td align="center" valign="top">
							<table border="0" bgcolor="#fff" cellpadding="0" cellspacing="0" width="560" class="flexibleContainer">
							  <tr>
								<td align="center" valign="top" width="560" class="flexibleContainerCell">
	
								  <table border="0" cellpadding="0" cellspacing="0" width="100%">
									<tr>
									  <td align="center" valign="top" class="imageContent" style="padding: 10px 0 10px;">
										<h1>Client <span style="color: #4bab7d;">Mirror</span></h1>
									  </td>
									</tr>
								  </table>
	
								</td>
							  </tr>
							</table>
						  </td>
						</tr>
					  </table>
					</td>
				  </tr>
			  </table>

			  

			  <table bgcolor="#fff" border="0" cellpadding="0" cellspacing="0" width="560" id="emailHeader">
				<tr>
					<td align="center" valign="top">
					  <table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
						  <td align="center" valign="top">
							<table border="0" bgcolor="#fff" cellpadding="0" cellspacing="0" width="560" class="flexibleContainer">
							  <tr>
								<td align="center" valign="top" width="560" class="flexibleContainerCell">
	
								  <table border="0" cellpadding="0" cellspacing="0" width="100%">
									<tr>
									  <td align="center" valign="top" class="imageContent">
										<h2>Most secure platform to mirror Emails and messages.</h2>
									  </td>
									</tr>
								  </table>
	
								</td>
							  </tr>
							</table>
						  </td>
						</tr>
					  </table>
					</td>
				  </tr>
			  </table>

			  <table bgcolor="#fff" border="0" cellpadding="0" cellspacing="0" width="560" id="emailHeader">
				<tr>
					<td align="center" valign="top">
					  <table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
						  <td align="center" valign="top">
							<table border="0" bgcolor="#fff" cellpadding="0" cellspacing="0" width="560" class="flexibleContainer">
							  <tr>
								<td align="center" valign="top" width="560" class="flexibleContainerCell">
	
								  <table border="0" cellpadding="0" cellspacing="0" width="100%">
									<tr>
									  <td align="center" valign="top" class="imageContent">
										<h2 style="margin: 0;">
											Hi <span style="color: #4bab7d;">your name!</span>
										</h2>
									  </td>
									</tr>

									<tr>
										<td height="20"></td>
									</tr>

								  </table>
	
								</td>
							  </tr>
							</table>
						  </td>
						</tr>
					  </table>
					</td>
				  </tr>
			  </table>

			  

            <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="560" id="emailBody">

              <tr>
                <td align="center" valign="top" bgcolor="#eff6f1" style="background-color: #4bab7d;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="560" class="flexibleContainer">
                          <tr>
                            <td align="center" valign="top" width="560" class="flexibleContainerCell">
                              <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" valign="top">

                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tr>
                                        <td align="center" valign="top" class="textContent">
                                          <h3 style="text-align: center;color: #fff;margin: 0;">Thank you for choosing us.</h3>
                                        </td>
                                      </tr>

									  <tr>
                                        <td align="center" valign="top" class="textContent">
                                          <h3 style="text-align: center;color: #fff;margin: 0;">Use this OTP to complete the sign up procedures and verify your account on Client Mirror.</h3>
                                        </td>
                                      </tr>

									  <tr>
										<td height="40"></td>
									  </tr>

									  <tr>
                                        <td align="center" valign="top" class="textContent">
                                          <h1 style="text-align: center;color: #fff;margin: 0;"><span style="letter-spacing: 4px; background: #65bf94;padding: 6px 25px 7px;border-radius: 30px;">${otp}</span></h1>
                                        </td>
                                      </tr>

									  <tr>
										<td height="40"></td>
									  </tr>

									  <tr>
                                        <td align="center" valign="top" class="textContent">
                                          <h3 style="text-align: center; color: #fff;margin: 0;">Please don't share this secure OTP with anyone,</h3>
                                          <h3 style="text-align: center; color: #fff;margin: 0;">not even with members of Client Mirror's team. </h3>

                                        </td>
                                      </tr>

									  <tr>
										<td height="10"></td>
									  </tr>

                                    </table>

                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="560" class="flexibleContainer">
							<tr>
								<td height="30"></td>
							</tr>
                          <tr>
                            <td align="center" valign="top" width="560" class="flexibleContainerCell">
                              <table class="flexibleContainerCellDivider" border="0" cellpadding="30" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" valign="top" style="padding-top:0px;padding-bottom:0px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="60%" class="emailButton" style="background-color: #4BAB7D; border-radius: 30px;">
										<tr>
										  <td align="center" valign="middle" class="buttonContent">
											<a style="color:#FFFFFF;text-decoration:none;font-weight: normal;outline: none;" href="#" target="_blank">DOWNLOAD THE APP NOW</a>
										  </td>
										</tr>
									  </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

						  <tr>
							<td height="10"></td>
						  </tr>

                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- // end of divider -->

              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer">
                          <tr>
                            <td valign="top" width="500" class="flexibleContainerCell">

                              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td align="left" valign="top" class="flexibleContainerBox">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100" style="max-width:100%;">
                                      <tr>
                                        <td align="center" class="textContent">
                                          <img src="https://cloud-hrms-tool.s3.amazonaws.com/mma-backend/security.png" width="100" class="flexibleImage" style="max-width:100%;" alt="High Security" title="High Security" />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td align="right" valign="center" class="flexibleContainerBox">
                                    <table class="flexibleContainerBoxNext" border="0" cellpadding="0" cellspacing="0" width="300" style="max-width:100%;">
                                      <tr>
                                        <td align="left" class="textContent">
                                          <h2 style="color:#4BAB7D;margin-top:0;margin-bottom: 8px;text-align:left;">High Security</h2>
                                          <h4 style="text-align:left;margin:0;color:#5F5F5F;">We consider it our responsibility to secure our trusted users.</h4>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>

                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- divider -->
              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                          <tr>
                            <td align="center" valign="top" width="500" class="flexibleContainerCell">
                              <table class="flexibleContainerCellDivider" border="0" cellpadding="30" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" valign="top" style="padding-top:0px;padding-bottom:0px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tr>
                                        <td align="center" valign="top" style="border-top:1px solid #C8C8C8;"></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- // end of divider -->

              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer">
                          <tr>
                            <td valign="top" width="500" class="flexibleContainerCell">

                              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td align="left" valign="top" class="flexibleContainerBox">
                                    <table class="flexibleContainerBoxNext" border="0" cellpadding="0" cellspacing="0" width="300" style="max-width:100%;">
										<tr>
										  <td align="left" class="textContent">
											<h2 style="color:#4BAB7D;margin-top:0;margin-bottom: 8px;text-align:left;">Most Reliable</h2>
											<h4 style="text-align:left; margin:0;color:#5F5F5F;">You can trust us to keep your data safe with us.</h4>
										  </td>
										</tr>
									  </table>
                                  </td>
                                  <td align="right" valign="top" class="flexibleContainerBox">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100" style="max-width:100%;">
										<tr>
										  <td align="center" class="textContent">
											<img src="https://cloud-hrms-tool.s3.amazonaws.com/mma-backend/reliable.png" width="100" class="flexibleImage" style="max-width:100%;" alt="Reliable" title="Reliable" />
										  </td>
										</tr>
									  </table>
                                  </td>
                                </tr>
                              </table>

                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td align="center" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#4bab7d">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="560" class="flexibleContainer">
                          <tr>
                            <td align="center" valign="top" width="560" class="flexibleContainerCell">
                              <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                <tr>
                                  <td align="center" valign="top">

                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tr>
                                        <td valign="top" class="textContent" align="center">
											                      <h5  style="color: #fff;text-align: center;">Copyright &#169; 2023. All rights reserved.</h5>
                                        </td>
                                      </tr>
                                    </table>

                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td>
                  <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="560" id="emailHeader">
                    <tr>
                      <td height="30px" align="center" valign="top">
      
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

          </td>
        </tr>
      </table>
    </center>
  </body>
</html>`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error:", err);
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};
