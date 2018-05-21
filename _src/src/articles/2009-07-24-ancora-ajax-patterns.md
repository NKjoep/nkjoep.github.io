---
date: 2009-07-24T15:25:00+02:00
description: Ancora AJAX Patterns
layout: stf.com.html
tags: [development, js]
title: "Ancora AJAX Patterns"
---

Di tecnologie AJAX se ne parla tanto, sempre di più.
Vogliamo essere tutti più veloci tutti più attivi.

Ma di fatto:
- AJAX non è una tecnologia è un modo di pensare il flusso applicativo
- Si usano i vecchi strumenti per fare cose nuove
- La questione delle richieste a seconda del browser è ormai superata senza alcun dubbio

Rimangono comuqne dei big problem: browser history, accessibility, interface fragments and security.

Tutti parlano di ajax patterns di applicazioni e di tecnologie, di java e .net di GWT [...]

Ma nessuno si pone dalla parte dello sviluppo graduale e riusabile delle interfacce.

La domanda è: dato che per soddisfare le richieste client c'e' bisogno di risposte precise di singoli oggetti/dati, come faccio a non duplicare lo strato di presentazione?
Se sviluppo l'applicazione interamente senza ajax/javascript e poi ci voglio montare sopra qualcosa di dinamico la prima cosa che mi viene da pensare è: **scrivere le interfacce in frammenti e OO.**

Non so.

Guardare la figura sotto e vedere nell'esempio "classic" html+css data come risposta e nel secondo esempio "ajax" vedere xml data (che può essere qualunque cosa...) mi lascia il dubbio su come provvedere per la renderezzazione delle nuove informazioni.

anyway... we'll see

![Image](/assets/posts/2009-07-24-ancora-ajax-patterns/ajax-fig1_small.png)
