#!/usr/bin/env stack
-- stack --resolver lts-10.0 --install-ghc runghc --package turtle

-- for randomly picking up a language to use

module Main where

import System.Random

languages :: [String]
languages = words "C++ Java Python3 C C# JavaScript Ruby Scala Kotlin"

langCount :: Int
langCount = length languages

main :: IO ()
main = do
    g <- newStdGen
    let (ind, _) = randomR (0, langCount-1) g
    putStrLn $ languages !! ind
