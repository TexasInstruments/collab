---
layout: talk
title: "Extending the swsusp Hibernation Framework to ARM"
category: "Power"
conference: "Embedded Linux Conference Europe (ELC Europe)"
year: 2013
speaker: "Russell Dill, Texas Instruments"
description: "An examination of extending the Linux swsusp hibernation framework to work on ARM-based platforms."
slides: "https://elinux.org/images/b/b7/Dill-slides_1.pdf"
youtube: "https://www.youtube.com/watch?v=3hdbH-Ur-hE"
image: "https://img.youtube.com/vi/3hdbH-Ur-hE/hqdefault.jpg"
---

## About this talk

This talk explores the work required to bring the Linux kernel's swsusp (software suspend) hibernation framework, historically developed with x86 in mind, to ARM-based embedded platforms. It discusses the architecture-specific hurdles involved in saving and restoring full system state to non-volatile storage, including CPU context and MMU considerations unique to ARM. The talk also touches on how hibernation integrates with the broader suspend/resume power management infrastructure in the kernel. Overall, it presents practical engineering lessons from adapting a mainline power-management subsystem to a new architecture.
