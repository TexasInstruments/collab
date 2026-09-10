---
layout: talk
title: "Writing Your Own Kernel Cryptographic Accelerator Driver"
category: "Security"
conference: "Embedded Linux Conference Europe (ELC Europe)"
year: 2020
speaker: "Tero Kristo, Texas Instruments"
description: "A practical guide to implementing a Linux kernel driver for a hardware cryptographic accelerator."
slides: "https://elinux.org/images/b/b1/Elce-2020-writing-crypto-acc-driver.pdf"
youtube: "https://www.youtube.com/watch?v=5BJnQxn24jo"
image: "https://img.youtube.com/vi/5BJnQxn24jo/hqdefault.jpg"
---

## About this talk

This talk walks through the process of writing a driver for a hardware cryptographic accelerator within the Linux kernel's crypto API framework. It covers how to register algorithm implementations, hook into the kernel's crypto transform layer, and handle asynchronous request queues for offloading operations like AES or hashing to dedicated hardware. The talk also addresses common pitfalls around DMA buffer management and performance tuning when integrating a hardware engine. It is aimed at driver developers seeking to expose SoC-level crypto hardware to userspace and kernel consumers through the standard crypto subsystem.
