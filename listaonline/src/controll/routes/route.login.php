<?php

	require("../process/process.login.php");

	include("configs.php");

	$up = new LoginProcess();

	switch($_SERVER['REQUEST_METHOD']) {
		case "GET":
			$up->doGet($_GET);
			break;

		case "POST":
			$up->doPost($_POST);
			break;

		case "PUT":
			$up->doPut($_PUT);
			break;

		case "DELETE":
			$up->doDelete($_DELETE);
			break;
	}