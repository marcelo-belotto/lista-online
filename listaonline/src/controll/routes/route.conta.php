<?php

	require("../process/process.conta.php");

	include("configs.php");

	$cp = new ContaProcess();

	switch($_SERVER['REQUEST_METHOD']) {
		case "GET":
			$cp->doGet($_GET);
			break;

		case "POST":
			$cp->doPost($_POST);
			break;

		case "PUT":
			$cp->doPut($_PUT);
			break;

		case "DELETE":
			$cp->doDelete($_DELETE);
			break;
	}