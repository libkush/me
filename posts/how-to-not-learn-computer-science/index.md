---
title: how to NOT start learning computer science
date: 2021-10-02
tags: ['learn']
published: true
---

Trust me, NUMEROUS people are trying to help you learn IT and computer science out there. Many will even charge you handsome amounts of money just to teach you the so-called "coding skills". And I am here to debunk them :+1:.

<!--more-->

### debunking paid professional courses

I started learning C++ 2 years back, and the first thing anyone teaches you is this-

```cpp
#include<iostream>

using namespace std;

int main()
{
    // Prints "Hello World"
    cout<<"Hello World";
}
```

They ask you to ignore the extra code written above and tell you the `cout` statement prints out "Hello World" in the console. So I did just that, ignored the rest of the code and continued learning `cout` and `cin` statements and playing with them. Eventually, I wrote some basic calculators with `if`, `else` statements.

But none of them really made me comprehend how stuff works. Until one of my friends came up with a project about a Discord music bot, and I had a look at the code. It was written in JavaScript for NodeJs and was taken from some GitHub repository. None of us really understood the functions and objects etc, but just focused on the message embeds, copying code from other files to customize the bot.

The need for understanding seemed really important only when we encountered an error for which StackOverflow didn't have an answer. I understood object-oriented programming from a few blogs and troubleshooting errors in the bot. Here is where the common approach of teaching programming fails, it never gives you the very purpose and crux of programming.

### the right approach

The purpose of most people, when they start coding, is either to get a job or to show off their skills in front of friends. Well, maybe getting a job is important, and you may keep it as your final goal. But while learning to program, you must understand the purpose of computers. Unlike the saying "Necessity is the mother of all inventions", I believe "Laziness is the mother of all inventions", including the invention of computers. It began with Charles Babbage asking the most prominent question of the century, "Well, if physical machines can do physical work, why can't physical machines also do mental work?". And that's how it begins, the computer was made from the origins of man's laziness to calculate themselves.

I believe that for being good at computer science, you must keep the lazy attitude of humans to not do tedious work themselves, but make computers do it for us. Programming is all about making the computers do stuff for us, not the other way around. When you take this ideology, you start getting the essence of making useful applications.

The second important thing to take care of while learning computer science and programming is to not get satisfied with "Hello World" programs. You must also get your hands dirty with things you don't understand yet. For educators, instead of asking students to "ignore the extra code", start from the basics, even if it might be overwhelming for them initially. Start with this (in JavaScript) -

```javascript
// name your function
// it takes two inputs a and b as arguments
function add(a, b) {
  // declare variable, set it's value to sum of inputs
  const sum = a + b;

  // return the value of sum
  return sum;
}
```

This is ideally how you should be starting to learn to code. Even if you don't understand this yet, try to make sense of what is written. Someone might have told you that a computer is a machine that takes some input, processes it and then returns the output. The same analogy we are going to use here to understand functional programming. While declaring a function, (in general, for most programming languages) we state its inputs, which we call "arguments". We do some operations (process) with the arguments and return some specific value as the output of that function. Now here we have a simple function that returns the value of the sum of its arguments. But there can be complex functions that do some stuff, and need not necessarily return a specific value.

I will probably make another article for learning the basics of functional and object-oriented programming. Once you understand what it means, different languages won't really make much difference for you as the only thing you might need to learn is the syntax. The syntax is what they really teach you in all the courses. But the syntax is just the very beginning of writing code. The real challenge is in solving real-world problems with the help of computers. After understanding this, the next thing you will need to learn is optimizing user experience. But for now, keep in mind, computers have to work for you and you don't have to work for them. That's the crux of programming, make computers your slave. (okay well not slaves they are your instruments, but you get the point)

_Go break some stuff :+1:_
