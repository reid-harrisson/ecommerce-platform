# example/views.py
from datetime import datetime

from django.http import HttpResponse

def DocsView(request):
    now = datetime.now()
    html = f'''
      <html>
      <body>
        <h1>API Endpoints</h1>
        <table>
          <thead>
            <tr> <th style="text-align:left">Method</th> <th style="text-align:left">Endpoint</th> </tr>
          </thead>
          <tbody>
            <tr> <td>POST</td> <td>/user</td> </tr>
            <tr> <td>GET</td> <td>/user</td> </tr>
            <tr> <td>POST</td> <td>/user/login</td> </tr>
            <tr> <td>POST</td> <td>/user/register</td> </tr>
            <tr> <td>POST</td> <td>/user/token/refresh</td> </tr>
            <tr> <td>POST</td> <td>/product</td> </tr>
            <tr> <td>GET</td> <td>/product</td> </tr>
            <tr> <td>GET</td> <td>/product/:id</td> </tr>
            <tr> <td>PUT</td> <td>/product/:id</td> </tr>
            <tr> <td>DELETE</td> <td>/product/:id</td> </tr>
            <tr> <td>POST</td> <td>/cart</td> </tr>
            <tr> <td>GET</td> <td>/cart/:id</td> </tr>
            <tr> <td>GET</td> <td>/cart?username</td> </tr>
            <tr> <td>PUT</td> <td>/cart/:id</td> </tr>
            <tr> <td>DELETE</td> <td>/cart/:id</td> </tr>
            <tr> <td>POST</td> <td>/order</td> </tr>
            <tr> <td>GET</td> <td>/order?username</td> </tr>
          </tbody>
        </table>
        <p>The current time is { now }.</p>
      </body>
    </html>
    '''
    return HttpResponse(html)