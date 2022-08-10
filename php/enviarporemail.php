<?php

	$nombre = $_POST['name'];
	$email = $_POST['email'];
	$telefono = $_POST['phone'];
	$mensaje = $_POST['message'];
	$check = $_POST['check'];

	if(isset($email)) {

		// Email provisional
		$email_to = "elissa.tm.developer@gmail.com";
		$email_subject = "Contacto desde el sitio web ETM";

		// Validar los datos ingresados por el usuario
		if(!isset($nombre) ||
			!isset($email) ||
			!isset($telefono) ||
			!isset($mensaje)) {

			echo "<b>Ocurrió un error y el formulario no ha sido enviado. </b><br />";
			echo "Por favor, vuelva atrás y verifique la información ingresada<br />";
			die();
		}

		$email_message = "Detalles del formulario de contacto:\n\n";
		$email_message .= "Nombre: " . $nombre . "\n";
		$email_message .= "E-mail: " . $email . "\n";
		$email_message .= "Teléfono: " . $telefono . "\n";
		$email_message .= "Comentarios: " . $mensaje . "\n";
		$email_message .= "Acepto la política de privacidad: " . $check . "\n\n";

		// Ahora se envía el e-mail usando la función mail() de PHP
		$headers = 'From: '.$email."\r\n".
		'Reply-To: '.$email."\r\n" .
		'X-Mailer: PHP/' . phpversion();
		@mail($email_to, $email_subject, $email_message, $headers);

		echo "¡El formulario se ha enviado con éxito!";
		
	}

?>
