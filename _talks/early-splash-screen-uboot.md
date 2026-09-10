---
layout: talk
title: "Early Splash Screen Using U-Boot"
category: "Graphics"
conference: "Embedded Open Source Summit (EOSS) Europe"
year: 2023
speaker: "Devarsh Thakkar & Nikhil M Jain, Texas Instruments"
description: "An explanation of how to display an early boot splash screen using U-Boot on embedded platforms."
youtube: "https://www.youtube.com/watch?v=-uJ_mNUjYpM"
image: "https://img.youtube.com/vi/-uJ_mNUjYpM/hqdefault.jpg"
---

## About this talk

This talk explains how to render an early splash screen during boot using U-Boot, before the Linux kernel and its display stack are up. It covers the relevant U-Boot display drivers and configuration options needed to initialize the display and show an image at the earliest possible point in the boot sequence. The talk also discusses tradeoffs around boot time, image format, and handoff to the main OS display stack once the kernel takes over (exact conference edition inferred from publish date; not independently confirmed).
