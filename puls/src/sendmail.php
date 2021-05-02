<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'Mailer/src/Exception.php';
require 'Mailer/src/PHPMailer.php';
require 'Mailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'Mailer/language/');
$mail->IsHTML(true);//Возможность тэгов в письме

$mail->IsSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'donRomataEstorskiy@gmail.com';                 // Наш логин
$mail->Password = 'kvadim1982';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;      

//От кого письмо
$mail->setFrom('donRomataEstorskiy@gmail.com', 'Puls');
//Кому
$mail->addAddress('vertersssr@mail.ru','');
$mail->Subject='Заказ с сайта';//Тема письма
//Тело письма
$body = '<h1>Заказ с сайта Puls!</h1>';
//Проверка полей формы
if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
}

$mail->Body=$body;
//отправка
if(!$mail->send()){
    $message = 'Ошибка';
}else{
    $message = 'Ваши данные отправлены!';
}
$response = ['message' => $message];//формируем json
header('Content-type: application/json');
echo json_encode($response);
?>