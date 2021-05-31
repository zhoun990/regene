import React, { useEffect, useState, createRef, useRef } from "react";
import level1 from "./level1";

export const stageProvider = (name) => {
	if (name == "level1") {
		return level1;
	} else {
		return null;
	}
};
