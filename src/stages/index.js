import React, { useEffect, useState, createRef, useRef } from "react";
import { db } from "../../api/Firebase/firebase";
import level1 from "./level1";
import level2 from "./level2";

export const stageProvider = (name) => {
	if (name == "level1") {
		return level1;
	} else if (name == "level2") {
		return level2;
	} else if (name == "deploy") {
		db.collection("stage").doc("stage").set({ level1: level1, level2: level2 });

		return null;
	} else {
		return null;
	}
};
