import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://img.icons8.com/material-outlined/64/ffffff/filled-like.png',
        likedImageUrl: 'https://img.icons8.com/material-outlined/64/fa3142/filled-like.png'
    },
    {
        name: 'Comment',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/64/ffffff/comments--v1.png',
    },
    {
        name: 'Share',
        imageUrl: 'https://img.icons8.com/windows/64/ffffff/share-3.png',
    },
    {
        name: 'Save',
        imageUrl: 'https://img.icons8.com/pastel-glyph/64/ffffff/bookmark-ribbon.png',
    }
]

const Post = ({post}) => {
  return (
    <View style={{ marginBottom: 30 }}>
    <Divider />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10}}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  )
}


const PostHeader = ({ post }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin:5, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{ uri: post.profile_picture }} style={styles.story} />
            <Text style={{ color:'white', marginLeft: 5, fontWeight: '700'}}>{
                post.user
            }</Text>
        </View>
        <Text style={{ color: 'white', fontWeight: '900', fontSize: 20}}>...</Text>
    </View>
)

export const Divider = () => (
    <View style={ styles.divider }></View>
)

const PostImage = ({ post }) => (
    <View style={{ width: '100%', height: 450}}>
        <Image source={{ uri: post.imageUrl }} style={{ height: '100%', resizeMode: 'cover'}} />
    </View>   
)

const PostFooter = () => (
   <View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '32%'}}>
     <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl} />
     <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
     <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={postFooterIcons[2].imageUrl} />
   </View>
   <View>
   <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
   </View>
   </View>
   </View>
   
)

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl}} />
    </TouchableOpacity>
)

const Likes = ({ post }) => (
   <View style={{ marginTop: 4, flexDirection: 'row'}}>
     <Text style={{ color: 'white', fontWeight: '600', fontSize: 16}}> {post.likes.toLocaleString('en')} likes </Text>
   </View>
)

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
     <Text style={{ color: 'white' }}>
     <Text style={{ fontWeight: '600', fontSize: 16,}}>{post.user}</Text>
      <Text>  {post.caption}</Text>
     </Text>
    </View>
)
// !!  called double ligation turns 0,1 to false,true

const CommentSection = ({ post}) => (
   <View style={{ marginTop: 5}}>
    {
        !!post.comments.length && (
    <Text style={{ color: 'gray'}}>
        View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
    </Text>
        )
    }
   </View>
)

const Comments = ({ post }) => (
   <>
    {
        post.comments.length > 3 ?
        (post.comments.map((comment, index) => (
        <View style={{ marginTop: 5 }} key={index}>
            <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: '600', fontSize: 16,}}>{comment.user}</Text>
            <Text>  {comment.comment.length >= 60 ? comment.comment.slice(0, 50) + ' ...' : comment.comment}</Text>
            </Text>
        </View>
    ))).slice(0,2) :
    post.comments.map((comment, index) => (
        <View style={{ marginTop: 5 }} key={index}>
            <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: '600', fontSize: 16,}}>{comment.user}</Text>
            <Text>  {comment.comment.length >= 60 ? comment.comment.slice(0, 50) + ' ...' : comment.comment}</Text>
            </Text>
        </View>
    ))
    }
   </>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: 'white',
    },
    divider: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#c1c1c1',
        backgroundColor: '#c1c1c1',
        marginBottom: 3
    },
    footerIcon: {
        width: 33,
        height: 33
    },
    shareIcon: {
        transform: [{ rotate: '320deg'}],
        marginTop: -3
    }
})

export default Post