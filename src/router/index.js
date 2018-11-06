import Vue from 'vue'
import Router from 'vue-router'
import HomePageView from '../components/HomePageView'
import ChannelView from '../components/ChannelView'
import DynamicView from '../components/DynamicView'
import PersonView from '../components/PersonView'
import IndexRouter from '../components/IndexRouter'
import PlayVideo from '../components/PlayVideo'
import ChannelDetail from '../components/ChannelDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: IndexRouter,
      children: [
        {
          path: '',
          name: 'HomePageView',
          component: HomePageView
        },
        {
          path: 'channel',
          name: 'ChannelView',
          component: ChannelView,
          children: [
            {
              path: '/channelDetail',
              name: 'ChannelDetail',
              component: ChannelDetail
            }
          ]
        },
        {
          path: 'dynamic',
          name: 'DynamicView',
          component: DynamicView
        },
        {
          path: 'person',
          name: 'PersonView',
          component: PersonView
        }
      ]
    },
    {
      path: '/play',
      name: 'PlayVideo',
      component: PlayVideo
    }
  ]
})
