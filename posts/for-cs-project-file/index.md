---
title: python concurrency basics for cryptbuddy
date: 2023-10-29
tags: []
published: false
---

We will look into the basics of python concurrency (doing different things simultaneously) in this blog post. Though I'm no expert in the subject myself, I can give a few analogies to explain the basics.

## The Basics

To get straight to the point, you will generally find two types of concurrencies in programming. Multi-threading and Multi-processing.

Imagine you have to complete two practical journals (say physics and chemistry) in school at the same time. Now there are three strategies you can choose from.

First strategy is to complete the physics journal first and then start completing the chemistry journal. It is the naive and inefficient (from the perspective of you being a computer) strategy.

Now for the second strategy, you can open both books on the desk at the same time, and follow a seemingly random pattern switching between writing in either book. You can write the first physics experiment, leave out the diagram and switch to the first chemistry experiment. On completing the written portion of chemistry experiment, you can take out your pencil box and draw the physics diagram. Using the same pencil you can now complete the graph in your chemistry experiment. You can continue working like this switching back and forth. This my friends is how multithreading works under the hood. If you were a superhuman who could write a page in nanoseconds, an external observer would think you are completing both books simultaneously (or rather "in parallel") but in reality you are still doing one thing at a time, just that you are managing your time much more efficiently.

Third strategy is to hire a co-worker to sit beside you on the desk and ask them to complete chemistry journal while you complete the physics journal. This is true parallellism since both books are being worked upon simultaneously by different people. You can think of this as multi-processing.

To bring it in the context of computers, multithreading is the same CPU core trying to complete multiple mini tasks simultaneously by not following a "strict sequence" of execution. Meanwhile multi-processing is more than one CPU cores trying to do different jobs on the same desk.

Reading this you would think obviously multi-processing is a better choice, isn't it? Well, there are certain trade-offs to think about when talking about computers, especially python.

## The Trade-offs 

Multi-threading usually shares the same memory space between all the mini processes (threads). This means any thread can modify the memory space as per its requirements. Sometimes this can lead to errors as other threads are not aware of the changes made to memory by some thread. It can cause race conditions where threads try to update memory at different times. It leads to all kinds of nasty problems if you don't know what you're doing. To avoid this, python interpretor (the program that reads your python code and tells the CPU to execute the instructions) has a safety lock called Global Interpreter Lock (GIL) which prevents different threads from executing bytecode simultaneously. Which basically means that Python blocks any advantages of multi-threading. Even if you use threads they will be executed sequentially. Meaning both physics and chemistry journals will be completed one by one again. To take true advantage of multithreading somebody needs to release this lock. Python doesn't allow you to do this but if you have written a C (language) library with a python interface, you could do this. It's a difficult workaround though.

Even multi-processing has its drawbacks. Multi-processing doesn't share memory space between processes. So what? you ask. Now if you want to send any data to a process, or get anything back from it, it involves a complex step called Inter Process Communication (IPC). When I want to pass a function with arguments to a process (for it to execute it) I need to first pickle the arguments into binary data.

> I hope you know pickle is used to convert python objects (strings, lists, ints etc) into raw binary

This pickled data is given to the process where it first has to un-pickle it back into python objects. Only then can it proceed with execution. Once the execution has been completed, it has to give it's return value back to the main process. So it will pickle it's return value and pass it back to the main process, and the main process has to un-pickle it. Can you guess why this is a problem? It can be a problem for two reasons. If your arguments or return values are large chunks of data it can take up significant amount of time in just pickling and un-pickling it. Waste of time. Now even if your data is small (let's say), but the execution time of the function is in nanoseconds, you were better off just executing the function normally instead of multi-processing. Why waste any time at all in IPC if you could just let the function run normally? Multi-processing wouldn't help, it will just extra nanoseconds for IPC. There is only one ideal case for multi-processing. You should use it only for highly computational tasks. If I had many gigantic matrices (of orders close to 1000) which had to be multiplied it makes sense to divide the work between multiple CPU cores. Since doing it one by one will take hours (literally!). You can shorten this time into minutes or seconds by efficient multi-processing. But if your task is not something that takes hours or minutes, you are better off not using multi-processing at all.

The ideal case for multi-threading is a bit different. Say you were serving a text file in your directory from an http server. You could use different threads to handle each http request. Threads are lightweight, and perfect for IO (input-output) bound tasks. But python's GIL makes things a lot tougher for us.

## Why CryptBuddy Chose Multi-threading

When I observed the performance of trying to encrypt chunks of data using multi-processing, I found that it actually took more time than encrypting entire data directly. This was mostly due to the reasons I gave above. Our arguments are large chunks of data (of a few megabytes) and our return value is a chunk of similar size too. Most of the time is wasted in pickling and unpickling it. So multi-processing was out of the list of options.

What about multi-threading then? I was worried that the GIL wouldn't allow any performance gains in multi-threading. But I was wrong. Turns out that the encryption library which we are importing (nacl) is originally written in C and pynacl is just an interface to the C functions. This interface was made using another library called CFFI (C Foreign Function Interface) which allows Python code to call C functions. Now deep within the documentation for CFFI I found that it actually releases the GIL when a C function is called. Which is a huge relief. I tried the benchmarks which showed execution time reducing from 700ms to 400ms for a file of size 300MB. That's a significant improvement considering actual intended file sizes are way larger than 300MB.

I know the last paragraph sounds confusing but to summarize it properly, here's what I mean.

Let's say you have a function written in C language
```c
int add(int a, int b) {
    return a + b;
}
```

Which you want to call within your python code. This is usually not applicable for other languages, but since the python interpreter itself is written in C, it does allow some level of interaction with C code. [CFFI](https://github.com/python-cffi/cffi) makes it easy for someone to wrap C functions in python.

There is a popular C library called [NaCl](https://nacl.cr.yp.to/) (Network and Cryptography library) which is the industry standard for most cryptographic problems, including encryption and decryption. Somebody decided they wanted to use it in their Python project, so they made their own library called [PyNaCl](https://github.com/pyca/pynacl) which uses CFFI under-the-hood to provide C functions in python. Which essentially means that whatever function we are calling from this library is actually being executed as a C function by CFFI. And CFFI releases the GIL whenever a C function is called. Take some time to read this again a few times until you understand it properly.

The main outcome of this is that our GIL issue has been resolved and multi-threading actually gave us a performance boost. But this isn't the end of our problems, as I will talk about the encryption problem with dividing data into chunks in another post.