﻿using System;

namespace SpotiSync.Models;

public class Song
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Artist { get; set; }
    public string Album { get; set; } 
    public string AlbumArtUrl { get; set; }
    public int DurationMs { get; set; } 
}