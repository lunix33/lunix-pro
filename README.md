# LunixPro Web

This project contains the code used by the `lunix.pro` website.

You are free to clone and modify it as you wish.

Please give credit where when using this code.

# Technical issues

* Currently, when you are authenticated, all the requests to the API will need
  to validate the authentication token which is a slow process. This solution
  was kept over setting up a cache since it would imply keeping a list of
  validated key in memory as plain text or rehash the key with a simpler
  algorithm and less secure hasing algorithm.
