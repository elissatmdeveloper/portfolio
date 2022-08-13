<?php

// Guardar los datos recibidos en variables
	$nombre = $_POST['name'];
	$email = $_POST['email'];
	$telefono = $_POST['phone'];
	$mensaje = $_POST['message'];
	$check = $_POST['check'];

	if(isset($email)) {

		// Definir la dirección de destino y asunto
		$email_to = "elissa.tm.developer@gmail.com";
		$email_subject = "Contacto desde el sitio web ETMdeveloper";

		// Validar los datos ingresados por el usuario
		if(!isset($nombre) ||
			!isset($email) ||
			!isset($telefono) ||
			!isset($mensaje)) {

			echo "<b>Ocurrió un error y el formulario no ha sido enviado. </b><br />";
			echo "Por favor, vuelva atrás y verifique la información ingresada<br />";
			die();
		}

		// Arma el cuerpo del mensaje
		$email_message = "Detalles del formulario de contacto:\n\n";
		$email_message .= "Nombre: " . $nombre . "\n";
		$email_message .= "E-mail: " . $email . "\n";
		$email_message .= "Teléfono: " . $telefono . "\n";
		$email_message .= "Comentarios: " . $mensaje . "\n";
		$email_message .= "Acepto la política de privacidad: " . $check . "\n\n";

		// Ahora se envía el e-mail usando la función mail() de PHP
		// Las cabeceras se usan para evitar que el correo llegue a SPAM
		$headers = 'From: '.$email."\r\n".
		'Reply-To: '.$email."\r\n" .
		'X-Mailer: PHP/' . phpversion();
		@mail($email_to, $email_subject, $email_message, $headers);

		echo '<script type="text/javascript">
					alert("¡El formulario se ha enviado con éxito!");
					window.location.href="../index.html";
					</script>';
	}

?>
