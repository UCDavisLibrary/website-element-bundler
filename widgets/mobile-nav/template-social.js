export default /* @html */`
<div class="vertical-center justify-center secondary-nav-icons" slot="socialmedia">
    <div class="donate"><a href="http://give.ucdavis.edu/ULIB">Donate</a></div>
    <template is="dom-if" if="{{facebook}}">
        <a href="{{ facebook }}" target="_blank"><i class="icon-facebook"></i></a>
    </template>
    <template is="dom-if" if="{{twitter}}">
    <a href="{{ twitter }}" target="_blank"><i class="icon-twitter"></i></a>
    </template>
    <template is="dom-if" if="{{instagram}}">
    <a href="{{ instagram }}" target="_blank"><i class="icon-instagram"></i></a>
    </template>
    <template is="dom-if" if="{{youtube}}">
    <a href="{{ youtube }}" target="_blank"><i class="icon-youtube"></i></a>
    </template>
    <template is="dom-if" if="{{pinterest}}">
    <a href="{{ pinterest }}" target="_blank"><i class="icon-pinterest"></i></a>
    </template>
</div>
`
