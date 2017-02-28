{% if item.emmet.length > 0 %}
  <h3 class="item__sub-heading">Emmet</h3>

  {% for emmet in item.emmet %}
      <div class="item__emmet  emmet">
        <pre class="emmet__code  language-emmet"><code class="language-emmet">{{ emmet|escape|safe }}</code></pre>
      </div>
  {% endfor %}
{% endif %}
