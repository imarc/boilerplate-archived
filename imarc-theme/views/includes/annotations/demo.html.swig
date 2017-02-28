{% if item.demo.length > 0 %}
  {% for demo in item.demo %}
    <p class="demo">
        <a class="button" href="../{{ demo|escape|safe }}">View Demo</a>
    </p>
  {% endfor %}
{% endif %}
